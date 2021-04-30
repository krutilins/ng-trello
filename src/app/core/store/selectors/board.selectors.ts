import { createSelector } from '@ngrx/store';
import { AppState } from '../models/app-state.model';
import { BoardState } from '../models/board-state.model';

export const selectBoardState = (state: AppState): BoardState => state.board;

export const selectBoardById = createSelector(
  selectBoardState,
  (boardState: BoardState, props: { boardId: string }) => boardState.boards.find(board => board.id === props.boardId)
);
