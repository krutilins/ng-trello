import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as TaskActions from '../actions/task.actions';
import { BoardService } from '../../services/board.service';

@Injectable({
  providedIn: 'root'
})
export class TaskEffects {

  public createTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.taskCreate),
      mergeMap(action => this.boardService.createTask(action.listId, action.title, action.description).pipe(
        map(task => TaskActions.taskCreateSuccess({ task })),
        catchError(errorMessage => of(TaskActions.taskCreateFailed({ errorMessage })))
      ))
    );
  });

  public deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.taskDelete),
      mergeMap(action => this.boardService.deleteTask(action.taskId).pipe(
        map(deletedTask => TaskActions.taskDeleteSuccess({ deletedTask })),
        catchError(errorMessage => of(TaskActions.taskDeleteFailed({ errorMessage })))
      ))
    );
  });

  public updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.taskUpdate),
      mergeMap(action => this.boardService.updateTask(action.taskId, {
        title: action.title,
        description: action.description
      }).pipe(
        map(changedTask => TaskActions.taskUpdateSuccess({ changedTask })),
        catchError(errorMessage => of(TaskActions.taskUpdateFailed({ errorMessage })))
      ))
    );
  });

  public dragTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.taskDrag),
      mergeMap(action => this.boardService.dragTask(action.taskMovingInfo).pipe(
        map(movingResult => TaskActions.taskDragSuccess(movingResult)),
        catchError(errorMessage => of(TaskActions.taskDragFailed({ errorMessage })))
      ))
    );
  });

  constructor(private actions$: Actions, private boardService: BoardService) { }
}
