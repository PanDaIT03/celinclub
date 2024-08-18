import { UploadFile } from 'antd';
import {
  addDoc,
  collection,
  getDocs,
  limit,
  query,
  startAfter,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

import { firestoreDatabase } from 'config/firebase';
import { toast } from 'config/toast';

export interface IFilterFindAll {
  pagination?: {
    startAfter: IRetailVisit;
    pageSize: number;
  };
  officeLocation?: string;
  stimulusProduct?: string;
}

export const RetailVisitApis = {
  findAll: async (params: IFilterFindAll): Promise<IRetailVisit[]> => {
    const conditions = Object.values({
      ...(params.pagination &&
        params.pagination.startAfter && {
          startAfter: startAfter(params.pagination.startAfter),
        }),
      ...(params.pagination &&
        params.pagination.pageSize && {
          limit: limit(params.pagination.pageSize),
        }),
    });

    try {
      const q = query(
        collection(firestoreDatabase, 'retailVisit'),
        ...conditions,
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => {
        const data = doc.data() as IRetailVisit;

        return {
          id: doc.id,
          ...data,
        };
      });
    } catch (error: any) {
      toast.error(error);
      return [];
    }
  },
  uploadRetailVisit: async (data: IRetailVisit) => {
    try {
      const { upload, ...others } = data;
      let error: string | undefined = undefined;

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

              return await getDownloadURL(uploadResult.ref);
            } catch (errorMessage: any) {
              error = errorMessage;
              return undefined;
            }
          }),
        );

      const urls = await uploadPhotos(upload.fileList);

      try {
        if (urls.filter((url) => url === undefined).length > 0) {
          toast.error(`Đã xảy ra lỗi trong quá trình upload ảnh: ${error}`);
          return;
        }

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