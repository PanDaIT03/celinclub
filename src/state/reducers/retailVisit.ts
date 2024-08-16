import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RetailVisitApis } from 'apis/retailVisit';
import { toast } from 'config/toast';

const initialState: IInitialState = {
  loading: false,
};

export const uploadRetailVisit = createAsyncThunk(
  'uploadRetailVisit',
  async (data: IRetailVisit) => {
    const result = await RetailVisitApis.uploadRetailVisit(data);

    if (result?.id) {
      toast.success('Cập nhật kết quả viếng thăm thành công!');
      return;
    }
  },
);

const retailVist = createSlice({
  initialState: initialState,
  name: 'retailVisit',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(uploadRetailVisit.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadRetailVisit.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(uploadRetailVisit.rejected, (state, action) => {
      state.loading = true;
      console.log(action.error);
    });
  },
});

export const { reducer: retailVisitReducer } = retailVist;
