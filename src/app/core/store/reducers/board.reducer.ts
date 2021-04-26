
import { BoardState } from '../models/board-state.model';
import * as BoardActions from '../actions/board.actions';
import { createReducer, on } from '@ngrx/store';

const initialState: BoardState = {
  boardContent: {
    boardContent: null,
    errorMessage: null
  },
  previewList: {
    boardsPreview: [],
    errorMessage: null
  }
};

export const boardReducer = createReducer(
  initialState,
  on(BoardActions.boardCreateSuccess, (state, { boardPreview }) => ({
    ...state,
    previewList: {
      boardsPreview: [...state.previewList.boardsPreview, boardPreview],
      errorMessage: null
    }
  })),
  on(BoardActions.boardCreateFailed, (state, { errorMessage }) => ({
    ...state,
    previewList: {
      ...state.previewList,
      errorMessage
    }
  })),
  on(BoardActions.previewListLoadSuccess, (state, action) => ({
    ...state,
    previewList: {
      boardsPreview: action.boardsPreview,
      errorMessage: null
    }
  })),
  on(BoardActions.previewListLoadFailed, (state, action) => ({
    ...state,
    previewList: {
      boardsPreview: state.previewList.boardsPreview,
      errorMessage: action.errorMessage
    }
  }))
);
