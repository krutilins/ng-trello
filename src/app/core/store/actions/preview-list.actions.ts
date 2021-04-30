import { createAction, props } from '@ngrx/store';
import { BoardMetadata } from '../../models/board-metadata.model';

// CREATE

export const boardCreate = createAction(
  '[Preview List] Board Create',
  props<{ name: string }>()
);

export const boardCreateSuccess = createAction(
  '[Preview List API] Board Create Success',
  props<{ boardPreview: BoardMetadata }>()
);

export const boardCreateFailed = createAction(
  '[Preview List API] Board Create Failed',
  props<{ errorMessage: string }>()
);

// LOAD

export const previewListLoad = createAction(
  '[Preview List] Preview LIst Load'
);

export const previewListLoadSuccess = createAction(
  '[Preview List API] Preview List Load Success',
  props<{ boardsPreview: BoardMetadata[] }>()
);

export const previewListLoadFailed = createAction(
  '[Preview List API] Preview List Load Failed',
  props<{ errorMessage: string }>()
);

// DELETE BOARD PREVIEW

export const deleteBoardPreview = createAction(
  '[Preview List] Delete Board Preview',
  props<{ boardId: string }>()
);

export const deleteBoardPreviewSuccess = createAction(
  '[Preview List API] Delete Board Preview Success',
  props<{ boardId: string }>()
);

export const deleteBoardPreviewFailed = createAction(
  '[Preview List API] Delete Preview List Failed',
  props<{ errorMessage: string }>()
);
