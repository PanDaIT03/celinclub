import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { auth } from 'config/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

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
      console.log('User signed in:', user);

      // Optional: Bạn có thể lưu thông tin người dùng vào Firestore nếu cần
    //   const userRef = doc(db, "users", user.uid);
      // await setDoc(userRef, { email: user.email, name: user.displayName });
      return user as IUser;
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
