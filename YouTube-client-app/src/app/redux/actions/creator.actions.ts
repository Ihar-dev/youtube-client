import { createAction, props } from "@ngrx/store";

import { SearchItem } from '../../youtube/models/search-item.model';

const addCustomCard = createAction(
  '[Creator] Add card',
  (item: SearchItem) => item,
);

const addSearchItems = createAction(
  '[Creator] Add search cards',
  props<{data: SearchItem []}>(),
);

export { addCustomCard, addSearchItems };
