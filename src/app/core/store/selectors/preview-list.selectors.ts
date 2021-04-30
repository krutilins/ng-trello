import { createSelector } from '@ngrx/store';
import { AppState } from '../models/app-state.model';
import { PreviewListState } from '../models/preview-list-state.model';

export const selectPreviewListState = (state: AppState): PreviewListState => state.previewList;

export const selectPreviewList = createSelector(
  selectPreviewListState,
  (boardState: PreviewListState) => boardState.previewList
);
