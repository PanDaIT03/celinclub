import { collection, getDocs, query } from 'firebase/firestore';

import { firestoreDatabase } from 'config/firebase';

export const StimulusProductApis = {
  getAll: async (): Promise<IStimulusProduct[]> => {
    try {
      const q = query(collection(firestoreDatabase, 'stimulusProducts'));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data()?.name ?? '',
      }));
    } catch (error) {
      console.log(error);
      return [];
    }
  },
};
