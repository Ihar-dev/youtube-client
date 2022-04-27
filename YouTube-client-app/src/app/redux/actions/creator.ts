import { state } from "@angular/animations";
import { createAction, createReducer, on, props } from "@ngrx/store";

import { SearchItem } from '../../youtube/models/search-item.model';

const addCustomCard = createAction(
  '[Creator] Add card',
  (item: SearchItem) => item,
);

const addSearchItems = createAction(
  '[Creator] Add search cards',
  props<{data: SearchItem []}>(),
);

interface CreatorState {
  customCards: SearchItem [],
  searchItems: SearchItem [],
}

const initialState: CreatorState = {
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
    searchItems: [...JSON.parse(JSON.stringify(data))],
  })),
);

export { addCustomCard, addSearchItems, CreatorState, initialState, creatorReducer };
