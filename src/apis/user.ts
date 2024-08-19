import { doc, getDoc, setDoc } from 'firebase/firestore';

import { firestoreDatabase } from 'config/firebase';
import { toast } from 'config/toast';

export const UserApis = {
  findById: async (uid: string): Promise<IFindById> => {
    try {
      const result = await getDoc(doc(firestoreDatabase, 'users', uid));

      return {
        email: result.data()?.email,
        displayName: result.data()?.displayName,
        photoURL: result.data()?.photoURL,
        role: result.data()?.role ?? 'user',
        ...result.data(),
        id: result.id,
        exists: result.exists(),
      } as IFindById;
    } catch (error: any) {
      toast.error(error);
      return {} as IFindById;
    }
  },
  save: async (data: IUser) => {
    const { id, ...others } = data;

    await setDoc(doc(firestoreDatabase, 'users', id), { ...others });
  },
};
