import { createReducer, on } from '@ngrx/store';
import { BoardList } from '../../models/board-list.model';
import * as BoardListActions from '../actions/board-list.actions';

const initialState: BoardList = {
  boards: []
};

export const boardReducer = createReducer(
  initialState,
  on(BoardListActions.addBoardSuccess, (state, boardCard) => {
    console.log(boardCard);
    return {
      boards: [...state.boards, boardCard]
    };
  }),
  on(BoardListActions.deleteBoardSuccess, (state, { uid }) => {
    return {
      boards: state.boards.filter(boardCard => boardCard.uid !== uid)
    };
  })
);
