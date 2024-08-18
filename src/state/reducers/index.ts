import { combineReducers } from '@reduxjs/toolkit';

import { retailVisitReducer } from './retailVisit';
import { stimulusProductReducer } from './stimulusProduct';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  retailVisit: retailVisitReducer,
  stimulusProduct: stimulusProductReducer,
  user: userReducer,
});
