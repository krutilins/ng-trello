import { createAction, props } from '@ngrx/store';
import { BoardCard } from '../../models/board-card.model';

// LOAD BOARD LIST
export const loadBoardList = createAction(
  '[Board List] Load Board List'
);

export const loadBoardListSuccess = createAction(
  '[Board List API] Load Board List Success',
  props<{ name: string, uid: string }>()
);

export const loadBoardListFailed = createAction(
  '[Board List API] Load Board List Failed',
  props<{ error: string }>()
);

export const addBoard = createAction(
  '[Board List] Add Board Card',
  props<{ name: string }>()
);

export const addBoardSuccess = createAction(
  '[Board List API] Add Board Card Success',
  props<BoardCard>()
);

export const addBoardFailure = createAction(
  '[Board List API] Add Board Card Failure',
  props<{ name: string }>()
);

export const deleteBoard = createAction(
  '[Board List] Delete Board Card',
  props<BoardCard>()
);

export const deleteBoardSuccess = createAction(
  '[Board List API] Delete Board Card Success',
  props<BoardCard>()
);

export const deleteBoardFailure = createAction(
  '[Board List API] Delete Board Card Failure',
  props<BoardCard>()
);
