import { state } from "@angular/animations";
import { createAction, createReducer, on } from "@ngrx/store";

import { SearchItem } from '../../youtube/models/search-item.model';

const addCard = createAction('[Creator] Add card');

interface CreatorState {
  customCards: SearchItem []
}

const initialState: CreatorState = {
  customCards: [],
};

const creatorReducer = createReducer(
  initialState,
  on(addCard, state => ({
    ...state,
    customCards: state.customCards
  })),
);

export { addCard, CreatorState, initialState, creatorReducer };
