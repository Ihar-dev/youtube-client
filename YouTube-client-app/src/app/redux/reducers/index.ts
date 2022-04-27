import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../../environments/environment';
import { creatorReducer } from './creator.reducer';
import { CreatorStateModel } from '../state.models';

export interface State {
  creator: CreatorStateModel,
}

export const reducers: ActionReducerMap<State> = {
  creator: creatorReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
