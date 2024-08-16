import { addDoc, collection } from 'firebase/firestore';

import { firestoreDatabase } from 'config/firebase';
import { toast } from 'config/toast';

export const RetailVisitApis = {
  uploadRetailVisit: async (data: IRetailVisit) => {
    try {
      const entity = await addDoc(
        collection(firestoreDatabase, 'retailVisit'),
        data,
      );
      return entity;
    } catch (error: any) {
      toast.error(`Cập nhật kết quả viếng thăm thành công. ${error}`);
      return undefined;
    }
  },
};
