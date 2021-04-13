import { createSelector } from '@ngrx/store';
import { BoardList } from '../models/board-list.model';

export interface BoardListState {
  boardList: BoardList;
}

export interface AppState {
  boardListState: BoardListState;
}

export const selectBoardListState = (state: AppState) => state.boardListState;

export const selectBoardListBoards = createSelector(
  selectBoardListState,
  (state: BoardListState) => state.boardList.boards
);

