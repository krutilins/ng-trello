import { BoardState } from './board-state.model';
import { PreviewListState } from './preview-list-state.model';
import { SidebarState } from './sidebar-state.model';
import { UserState } from './user-state.model';

export interface AppState { // TODO: implement user state
  board: BoardState;
  previewList: PreviewListState;
  user: UserState;
  sidebar: SidebarState;
}
