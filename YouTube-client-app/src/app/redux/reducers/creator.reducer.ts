/* eslint-disable ngrx/on-function-explicit-return-type */
import { createReducer, on } from '@ngrx/store';

import { CreatorStateModel } from '../state.models';
import { addCustomCard, addSearchItems } from '../actions/creator.actions';

const initialState: CreatorStateModel = {
  customCards: [],
  searchItems: [],
};

const creatorReducer = createReducer(
  initialState,
  on(addCustomCard, (state, item) => ({
    ...state,
    customCards: [...JSON.parse(JSON.stringify(state.customCards)), item],
  })),
  on(addSearchItems, (state, { data }) => ({
    ...state,
    searchItems: data,
  })),
);

export { creatorReducer };
