import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../../environments/environment';
import { CreatorState, creatorReducer } from '../actions/creator';

export interface State {
  creator: CreatorState,
}

export const reducers: ActionReducerMap<State> = {
  creator: creatorReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
