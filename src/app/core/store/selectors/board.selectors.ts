import { createSelector } from '@ngrx/store';
import { AppState } from '../models/app-state.model';
import { BoardState } from '../models/board-state.model';

export const selectBoardState = (state: AppState): BoardState => state.board;

export const selectBoardContent = createSelector(
  selectBoardState,
  (boardState: BoardState) => boardState.boardContent
);

export const selectPreviewList = createSelector(
  selectBoardState,
  (boardState: BoardState) => boardState.previewList
);
