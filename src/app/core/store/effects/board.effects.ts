import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { BoardService } from '../../services/board.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as BoardActions from '../actions/board.actions';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-state.model';
import { deleteBoardPreviewSuccess } from '../actions/preview-list.actions';

@Injectable()
export class BoardEffects {

  public loadBoardContent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.boardLoad),
      mergeMap(action => this.boardService.loadBoardContent(action.boardId).pipe(
        map(boardContent => BoardActions.boardLoadSuccess({ boardContent })),
        catchError(errorMessage => of(BoardActions.boardLoadFailed({ errorMessage })))
      ))
    );
  });

  public deleteBoardContent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.boardDelete),
      mergeMap(action => this.boardService.deleteBoardMetadata(action.boardId).pipe(
        map(boardMetadata => {
          this.store.dispatch(deleteBoardPreviewSuccess({ boardId: boardMetadata.id }));
          return BoardActions.boardDeleteSuccess({ boardMetadata });
        }),
        catchError(errorMessage => of(BoardActions.boardDeleteFailed({ errorMessage })))
      ))
    );
  });

  constructor(private actions$: Actions, private boardService: BoardService, private store: Store<AppState>) { }
}

