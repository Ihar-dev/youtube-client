import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import {
  CreatorStateModel
} from '../state.models';

const selectCreatorState = createFeatureSelector < CreatorStateModel > ('creator');
const selectItemsState = createSelector(
  selectCreatorState,
  (state: CreatorStateModel) => state,
);

export { selectCreatorState, selectItemsState };
