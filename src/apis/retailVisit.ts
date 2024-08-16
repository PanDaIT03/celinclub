import { addDoc, collection } from 'firebase/firestore';

import { firestoreDatabase } from 'config/firebase';

export const RetailVisitApis = {
  uploadRetailVisit: async (data: IRetailVisit) => {
    try {
      const entity = await addDoc(
        collection(firestoreDatabase, 'retailVisit'),
        data,
      );
      return entity;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  },
};
