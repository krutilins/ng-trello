import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { BoardService } from '../../services/board.service';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as BoardActions from '../actions/board.actions';
import { of } from 'rxjs';

@Injectable()
export class BoardEffects {

  public boardContentLoad$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.boardLoad),
      mergeMap(action => this.boardService.loadBoard(action.boardId).pipe(
        map(boardContent => BoardActions.boardLoadSuccess({ boardContent })),
        catchError(errorMessage => of(BoardActions.boardLoadFailed({ errorMessage })))
      ))
    );
  });

  public boardCreate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.boardCreate),
      mergeMap(action => this.boardService.createBoard(action.name).pipe(
        map(board => BoardActions.boardCreateSuccess({ boardPreview: board })),
        catchError(errorMessage => of(BoardActions.boardCreateFailed({ errorMessage })))
      ))
    );
  });

  public loadBoardPreviewList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.previewListLoad),
      mergeMap(() => this.boardService.loadPreviewBoardList().pipe(
        map(boardsPreview => BoardActions.previewListLoadSuccess({ boardsPreview })),
        catchError(errorMessage => of(BoardActions.previewListLoadFailed({ errorMessage })))
      ))
    );
  });

  public updateBoardContet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.boardContentUpdate),
      mergeMap(action => this.boardService.updateBoardContent(action.boardContent).pipe(
        map(boardContent => BoardActions.boardContentUpdateSuccess({ boardContent })),
        catchError(errorMessage => of(BoardActions.boardContentUpdate(errorMessage)))
      ))
    );
  });

  constructor(private actions$: Actions, private boardService: BoardService) { }
}

