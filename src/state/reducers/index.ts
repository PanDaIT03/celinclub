import { combineReducers } from '@reduxjs/toolkit';

import { retailVisitReducer } from './retailVisit';
import { stimulusProductReducer } from './stimulusProduct';

export const rootReducer = combineReducers({
  retailVisit: retailVisitReducer,
  stimulusProduct: stimulusProductReducer,
});
