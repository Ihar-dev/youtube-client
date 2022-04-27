import { state } from "@angular/animations";
import { createAction, createReducer, on, props } from "@ngrx/store";

import { SearchItem } from '../../youtube/models/search-item.model';

const addCard = createAction(
  '[Creator] Add card',
  // props<{item: SearchItem}>(), second option
  (item: SearchItem) => item,
);

interface CreatorState {
  customCards: SearchItem []
}

const initialState: CreatorState = {
  customCards: [],
};

const creatorReducer = createReducer(
  initialState,
  on(addCard, (state, item) => ({
    ...state,
    customCards: [...JSON.parse(JSON.stringify(state.customCards)), item],
  })),
);

export { addCard, CreatorState, initialState, creatorReducer };
