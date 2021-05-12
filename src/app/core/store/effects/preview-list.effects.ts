import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as PreviewListActions from '../actions/preview-list.actions';
import { BoardService } from '../../services/board.service';
import { boardDeleteSuccess } from '../actions/board.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-state.model';

@Injectable({
  providedIn: 'root'
})
export class PreviewListEffects {

  public createBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PreviewListActions.boardCreate),
      mergeMap(action => this.boardService.createBoardMetadata(action.name).pipe(
        map(board => PreviewListActions.boardCreateSuccess({ boardPreview: board })),
        catchError(errorMessage => of(PreviewListActions.boardCreateFailed({ errorMessage })))
      ))
    );
  });

  public loadBoardPreviewList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PreviewListActions.previewListLoad),
      mergeMap(action => this.boardService.loadPreviewList(action.userMetadata).pipe(
        map(boardsPreview => PreviewListActions.previewListLoadSuccess({ boardsPreview })),
        catchError(errorMessage => of(PreviewListActions.previewListLoadFailed({ errorMessage })))
      ))
    );
  });

  public deleteBoardPreview$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PreviewListActions.deleteBoardPreview),
      mergeMap(action => this.boardService.deleteBoardMetadata(action.boardId).pipe(
        map(boardMetadata => {
          this.store.dispatch(boardDeleteSuccess({ boardMetadata })); // TODO: can I do this here?
          return PreviewListActions.deleteBoardPreviewSuccess({ boardId: boardMetadata.id });
        }),
        catchError(errorMessage => of(PreviewListActions.deleteBoardPreviewFailed({ errorMessage })))
      ))
    );
  });

  constructor(private actions$: Actions, private boardService: BoardService, private store: Store<AppState>) { }
}
