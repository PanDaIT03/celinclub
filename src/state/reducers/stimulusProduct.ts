import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { StimulusProductApis } from 'apis/stimulusProduct';

type IStimulusProductInitialSate = {
  data: IStimulusProduct[];
} & IInitialState;

const initialState: IStimulusProductInitialSate = {
  data: [],
  loading: false,
};

export const getStimulusProducts = createAsyncThunk(
  'stimulusProduct/getStimulusProducts',
  async () => {
    return StimulusProductApis.getAll();
  },
);

const stimulusProductSlice = createSlice({
  initialState: initialState,
  name: 'stimulusProduct',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getStimulusProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStimulusProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getStimulusProducts.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer: stimulusProductReducer } = stimulusProductSlice;
