import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RetailVisitApis } from 'apis/retailVisit';
import { toast } from 'config/toast';

const initialState: IInitialState = {
  loading: false,
};

type IUploadRetailVisit = {
  onSuccess?: () => void;
} & IRetailVisit;

export const uploadRetailVisit = createAsyncThunk(
  'uploadRetailVisit',
  async (data: IUploadRetailVisit) => {
    const { onSuccess, ...others } = data;
    const result = await RetailVisitApis.uploadRetailVisit(others);

    if (result?.id) {
      toast.success('Cập nhật kết quả viếng thăm thành công!');
      onSuccess && onSuccess();

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
    builder.addCase(uploadRetailVisit.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(uploadRetailVisit.rejected, (state, action) => {
      state.loading = true;
      action.error.message && toast.error(action.error.message);
    });
  },
});

export const { reducer: retailVisitReducer } = retailVist;
