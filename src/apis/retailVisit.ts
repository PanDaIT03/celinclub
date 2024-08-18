import { UploadFile } from 'antd';
import dayjs from 'dayjs';
import {
  addDoc,
  collection,
  getCountFromServer,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

import { firestoreDatabase } from 'config/firebase';
import { toast } from 'config/toast';
import { StimulusProductApis } from './stimulusProduct';

export interface IFilterFindAll {
  pagination?: {
    startAfter: IRetailVisit;
    pageSize: number;
  };
  officeLocation?: string;
  stimulusProduct?: string;
  visitDate: string;
}

export const RetailVisitApis = {
  findAll: async (params: IFilterFindAll): Promise<IRetailVisitData> => {
    const date = new Date(params.visitDate);
    const timestamp = Timestamp.fromDate(date);

    const conditions = Object.values({
      orderBy: orderBy('visitDate', 'desc'),
      // ...(params.pagination &&
      //   params.pagination.startAfter && {
      //     startAfter: startAfter(params.pagination.startAfter),
      //   }),
      // ...(params.pagination &&
      //   params.pagination.pageSize && {
      //     limit: limit(params.pagination.pageSize),
      //   }),
      ...(params.officeLocation && {
        where: where('officeLocation', '==', params.officeLocation),
      }),
      ...(params.stimulusProduct && {
        where: where(
          'stimulusProductIds',
          'array-contains',
          params.stimulusProduct,
        ),
        ...(params.visitDate && {
          where: where('visitDate', '>=', timestamp),
          // ...(params.visitDate && {
          //   where: where('visitDate', '>=', () => {
          //     console.log(params.visitDate);

          //     if (!params.visitDate) return;

          //     const date = new Date(params.visitDate);
          //     const timestamp = Timestamp.fromDate(date);

          //     return timestamp;
          //   }),
        }),
      }),
    });

    try {
      const q = query(
        collection(firestoreDatabase, 'retailVisit'),
        ...conditions,
      );
      const querySnapshot = await getDocs(q);
      const stimulusProducts = await StimulusProductApis.getAll();
      const pageInfo = await getCountFromServer(
        collection(firestoreDatabase, 'retailVisit'),
      );

      const items = querySnapshot.docs.map((doc) => {
        const data = doc.data() as TRetailVisit;
        const visitDate = dayjs(
          (data.visitDate as unknown as Timestamp).toDate(),
        ).isValid()
          ? dayjs((data.visitDate as unknown as Timestamp).toDate()).format(
              'DD/MM/YYYY',
            )
          : undefined;

        return {
          id: doc.id,
          ...data,
          visitDate: visitDate,
          stimulusProducts: stimulusProducts
            .filter((product) =>
              doc
                .data()
                .stimulusProductIds.some((id: string) => id === product.id),
            )
            .map((item) => item.name)
            .join(', '),
        };
      });

      return {
        items: items,
        pageInfo: {
          currentPage: 1,
          itemsPerPage: params.pagination?.pageSize,
          totalItems: pageInfo.data().count,
        },
      };
    } catch (error: any) {
      console.log(error);
      toast.error(error);
      return {} as IRetailVisitData;
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
