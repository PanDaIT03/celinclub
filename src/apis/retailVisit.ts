import { UploadFile } from 'antd';
import {
  addDoc,
  collection,
  getCountFromServer,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

import { firestoreDatabase } from 'config/firebase';
import { toast } from 'config/toast';
import {
  IRetailVisit,
  IRetailVisitData,
  TRetailVisit,
} from 'types/retailVisit';
import { convertTimestampToString } from 'utils/constants/constants';
import { StimulusProductApis } from './stimulusProduct';

export interface IFilterFindAll {
  pagination?: {
    startAfter: IRetailVisit;
    pageSize: number;
  };
  phoneNumber?: string;
  employeeName?: string;
  officeLocation?: string;
  stimulusProduct?: string;
  visitDate?: string;
}

export const RetailVisitApis = {
  findAll: async (params: IFilterFindAll): Promise<IRetailVisitData> => {
    console.log({
      orderBy: orderBy('visitDate', 'desc'),
      ...(params.officeLocation && {
        officeLocationWhere: where(
          'officeLocation',
          '==',
          params.officeLocation,
        ),
      }),
      ...(params.stimulusProduct && {
        stimulusProductWhere: where(
          'stimulusProductIds',
          'array-contains',
          params.stimulusProduct,
        ),
      }),
      ...(params.phoneNumber && {
        phoneNumberWhere: where('phoneNumber', '==', params.phoneNumber),
      }),
      ...(params.employeeName && {
        employeeNameWhere: where('employeeName', '==', params.employeeName),
      }),
    });

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
        officeLocationWhere: where(
          'officeLocation',
          '==',
          params.officeLocation,
        ),
      }),
      ...(params.stimulusProduct && {
        stimulusProductWhere: where(
          'stimulusProductIds',
          'array-contains',
          params.stimulusProduct,
        ),
      }),
      ...(params.phoneNumber && {
        phoneNumberWhere: where('phoneNumber', '==', params.phoneNumber),
      }),
      ...(params.employeeName && {
        employeeNameWhere: where('fullName', '==', params.employeeName),
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
        const dataFormatted =
          typeof data.visitDate !== 'string' &&
          typeof data.visitDate !== 'undefined'
            ? convertTimestampToString(data.visitDate)
            : undefined;

        return {
          id: doc.id,
          ...data,
          visitDate: dataFormatted,
          stimulusProducts: stimulusProducts
            .filter((product) =>
              (doc.data()?.stimulusProductIds ?? []).some(
                (id: string) => id === product.id,
              ),
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
