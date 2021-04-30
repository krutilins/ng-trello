import { createAction, props } from '@ngrx/store';
import { BoardContent } from '../../models/board-content.model';
import { BoardMetadata } from '../../models/board-metadata.model';

// LOAD BOARD

export const boardLoad = createAction(
  '[Board] Board Load',
  props<{ boardId: string }>()
);

export const boardLoadSuccess = createAction(
  '[Board API] Board Load Success',
  props<{ boardContent: BoardContent }>()
);

export const boardLoadFailed = createAction(
  '[Board API] Board Load Failed',
  props<{ errorMessage: string }>()
);

// DELETE BOARD

export const boardDelete = createAction(
  '[Board] Board Delete',
  props<{ boardId: string }>()
);

export const boardDeleteSuccess = createAction(
  '[Board API] Board Delete Success',
  props<{ boardMetadata: BoardMetadata }>()
);

export const boardDeleteFailed = createAction(
  '[Board API] Board Delete Failed',
  props<{ errorMessage: string }>()
);
