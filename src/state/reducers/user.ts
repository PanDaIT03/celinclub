import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth, firestoreDatabase } from 'config/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { NavigateFunction } from 'react-router-dom';

import { UserApis } from 'apis/user';
import path from 'routes/path';
import { toast } from 'config/toast';

type TUserInitialState = {
  user?: IUser;
} & IInitialState;

const user: TUserInitialState = {
  loading: false,
  user: undefined,
};

const googleProvider = new GoogleAuthProvider();

export const signInWithGooglePopup = createAsyncThunk(
  'user/signInWithGooglePopup',
  async ({ navigate }: { navigate: NavigateFunction }) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userDoc = await getDoc(doc(firestoreDatabase, 'users', user.uid));
      const currentUser = {
        displayName: user?.displayName ?? '',
        email: user?.email ?? '',
        photoURL: user?.photoURL ?? '',
        ...userDoc.data(),
        id: user.uid,
      } as IUser;

      if (!userDoc.exists())
        await UserApis.save({ ...currentUser, role: 'user' });

      if (userDoc.data()?.role === 'admin')
        navigate(path.MANAGEMENTRETAILVISIT);
      else navigate(path.ROOT);

      localStorage.setItem(
        'currentUser',
        JSON.stringify({
          ...currentUser,
          accessToken: await user.getIdToken(),
        }),
      );

      return currentUser;
    } catch (error: any) {
      toast.error('Error signing in with Google:', error?.message ?? error);
      return undefined;
    }
  },
);

const userSlice = createSlice({
  name: 'userSlice',
  initialState: user,
  reducers: {
    signOut: (state) => {
      state.user = undefined;
      localStorage.removeItem('currentUser');
    },
    signIn: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(signInWithGooglePopup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signInWithGooglePopup.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(signInWithGooglePopup.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer: userReducer } = userSlice;
export const { signOut, signIn } = userSlice.actions;
