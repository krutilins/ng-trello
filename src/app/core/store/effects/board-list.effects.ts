import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as BoardListActions from '../actions/board-list.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { BoardService } from '../../services/board.service';
import { of } from 'rxjs';

@Injectable()
export class BoardEffects {

  loadBoardList$ = createEffect(() => { // TODO: add load board list
    ofType(BoardListActions.loadBoardList),
      mergeMap(() => this.boardService.loadBoardList().pipe(

      ));
  });

  addBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardListActions.addBoard),
      mergeMap((action) =>
        this.boardService.createBoard(action.name).pipe(
          map(boardCard => {
            return BoardListActions.addBoardSuccess(boardCard);
          }),
          catchError(name => of(BoardListActions.addBoardFailure({ name })))
        )
      ),
    );
  });

  deleteBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardListActions.deleteBoard),
      mergeMap(action => this.boardService.deleteBoard(action.uid).pipe(
        map(() => BoardListActions.deleteBoardSuccess({
          uid: action.uid,
          name: action.name
        })),
        catchError(() => of(
          BoardListActions.deleteBoardFailure({
            uid: action.uid,
            name: action.name
          })))
      ))
    );
  });

  constructor(private actions$: Actions, private boardService: BoardService) { }
}

