import { state } from "@angular/animations";
import { createAction, createReducer, on, props } from "@ngrx/store";

import { SearchItem } from '../../youtube/models/search-item.model';
import { CreatorStateModel } from '../state.models';

const addCustomCard = createAction(
  '[Creator] Add card',
  (item: SearchItem) => item,
);

const addSearchItems = createAction(
  '[Creator] Add search cards',
  props<{data: SearchItem []}>(),
);

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
  on(addSearchItems, (state, {data}) => ({
    ...state,
    searchItems: data,
  })),
);

export { addCustomCard, addSearchItems, initialState, creatorReducer };
