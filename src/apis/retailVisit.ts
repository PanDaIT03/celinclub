import { UploadFile } from 'antd';
import { addDoc, collection } from 'firebase/firestore';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

import { firestoreDatabase } from 'config/firebase';
import { toast } from 'config/toast';

export const RetailVisitApis = {
  uploadRetailVisit: async (data: IRetailVisit) => {
    try {
      const { upload, ...others } = data;
      const urls: string[] = [];

      for (const key in others) {
        const currentKey = key as keyof Omit<IRetailVisit, 'upload'>;
        if (others[currentKey] === undefined) delete others[currentKey];
      }

      const storage = getStorage();

      const uploadPhotos = async (files: UploadFile<any>[]) =>
        Promise.all(
          files.map(async (file) => {
            if (!file.originFileObj) return;

            const storageRef = ref(
              storage,
              `uploads/retail-visit/${file.name}`,
            );

            const upload = await uploadBytesResumable(
              storageRef,
              file.originFileObj,
            );

            upload.task.on(
              'state_changed',
              (snapshot) => console.log(snapshot),
              (error) =>
                toast.error(
                  `Upload hình ảnh không thành công. ${error.message}`,
                ),
              () =>
                getDownloadURL(upload.task.snapshot.ref).then((downloadURL) => {
                  urls.push(downloadURL);
                }),
            );
          }),
        );

      try {
        await uploadPhotos(upload.fileList);

        console.log({ ...others, imageUrls: urls });

        const entity = await addDoc(
          collection(firestoreDatabase, 'retailVisit'),
          { ...others, imageUrls: urls },
        );

        return entity;
      } catch (error) {
        toast.error(`Upload ảnh thất bại. ${error}`);
      }
    } catch (error: any) {
      toast.error(`Cập nhật kết quả viếng thăm thất bại. ${error}`);
      return undefined;
    }
  },
};
