import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './models/app-state.model';
import { boardReducer } from './reducers/board.reducer';
import { previewlistReducer } from './reducers/preview-list.reducer';

export const reducer: ActionReducerMap<AppState> = {
  board: boardReducer,
  previewList: previewlistReducer
};
