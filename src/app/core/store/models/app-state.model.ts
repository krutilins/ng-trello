import { BoardState } from './board-state.model';
import { PreviewListState } from './preview-list-state.model';
import { UserState } from './user-state.model';

export interface AppState { // TODO: implement user state
  board: BoardState;
  previewList: PreviewListState;
  // user: UserState;
}
