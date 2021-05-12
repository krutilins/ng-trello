
import * as PreviewListActions from '../actions/preview-list.actions';
import { createReducer, on } from '@ngrx/store';
import { PreviewListState } from '../models/preview-list-state.model';

const initialState: PreviewListState = {
  previewList: []
};

export const previewlistReducer = createReducer(
  initialState,
  on(PreviewListActions.boardCreateSuccess, (state, { boardPreview }) => ({
    previewList: [...state.previewList, boardPreview]
  })),
  on(PreviewListActions.boardCreateFailed, (state, { errorMessage }) => ({
    ...state,
  })),
  on(PreviewListActions.previewListLoadSuccess, (state, action) => ({
    previewList: action.boardsPreview
  })),
  on(PreviewListActions.previewListLoadFailed, (state, { errorMessage }) => ({
    ...state,
  })),
  on(PreviewListActions.deleteBoardPreviewSuccess, (state, action) => ({
    previewList: state.previewList.filter(boardPreview => boardPreview.id !== action.boardId)
  })),
  on(PreviewListActions.deleteBoardPreviewFailed, (state, { errorMessage }) => ({
    ...state,
  })),
);
