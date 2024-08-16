import { createSlice } from '@reduxjs/toolkit';

// interface IInitialState {}

// const initialState: IInitialState = {};

// export const uploadRetailVisit = createAsyncThunk(
//   'uploadRetailVisit',
//   async () => {
//     const collection =
//   },
// );

const retailVist = createSlice({
  initialState: '',
  name: 'retailVisit',
  reducers: {},
  // extraReducers(builder) {},
});

export const { reducer: retailVisitReducer } = retailVist;
