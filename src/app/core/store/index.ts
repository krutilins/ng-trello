import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './models/app-state.model';
import { boardReducer } from './reducers/board.reducer';
import { previewlistReducer } from './reducers/preview-list.reducer';
import { sidebarReducer } from './reducers/sidebar.reducer';
import { userReducer } from './reducers/user.reducer';

export const reducer: ActionReducerMap<AppState> = {
  board: boardReducer,
  previewList: previewlistReducer,
  user: userReducer,
  sidebar: sidebarReducer
};
