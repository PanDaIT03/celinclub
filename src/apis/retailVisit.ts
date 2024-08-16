import { UploadFile } from 'antd';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

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

            try {
              const uploadResult = await uploadBytes(
                storageRef,
                file.originFileObj,
              );

              urls.push(await getDownloadURL(uploadResult.ref));
            } catch (error) {
              toast.error(`Đã xảy ra lỗi trong quá trình upload ảnh: ${error}`);
            }
          }),
        );

      await uploadPhotos(upload.fileList);

      try {
        const entity = await addDoc(
          collection(firestoreDatabase, 'retailVisit'),
          { ...others, imageUrls: urls },
        );

        return entity;
      } catch (error) {
        toast.error(
          `Đã xảy ra lỗi. Cập nhật kết quả viếng thăm thất bại. ${error}`,
        );
      }
    } catch (error: any) {
      toast.error(
        `Đã xảy ra lỗi. Cập nhật kết quả viếng thăm thất bại. ${error}`,
      );
      return undefined;
    }
  },
};
