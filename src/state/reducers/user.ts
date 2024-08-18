import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth } from 'config/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { UserApis } from 'apis/user';

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
  async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userDoc = await UserApis.findById(user.uid);

      if (!userDoc.exists()) {
        await UserApis.save({
          displayName: user?.displayName ?? '',
          email: user?.email ?? '',
          id: user?.uid ?? '',
          photoURL: user?.photoURL ?? '',
          role: 'user',
        });
      }

      return userDoc as IUser;
    } catch (error: any) {
      console.error('Error signing in with Google:', error?.message ?? error);
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
export const { signOut } = userSlice.actions;
