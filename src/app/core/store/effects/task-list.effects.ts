import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as TaskListActions from '../actions/task-list.actions';
import { BoardService } from '../../services/board.service';

@Injectable({
  providedIn: 'root'
})
export class TaskListEffects {

  public createTaskList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskListActions.taskListCreate),
      mergeMap(action => this.boardService.createTaskList(action.boardId, action.name).pipe(
        map(taskListMetadata => TaskListActions.taskListCreateSuccess({ taskListMetadata })),
        catchError(errorMessage => of(TaskListActions.taskListCreateFailed({ errorMessage })))
      ))
    );
  });

  public changeTaskListName$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskListActions.taskListNameChange),
      mergeMap(action => this.boardService.updateTaskList(action.taskListId, { name: action.newName }).pipe(
        map(taskListMetadata => TaskListActions.taskListNameChangeSuccess({ taskListMetadata })),
        catchError(errorMessage => of(TaskListActions.taskListNameChangeFailed({ errorMessage })))
      ))
    );
  });

  public deleteTaskList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskListActions.taskListDelete),
      mergeMap(action => this.boardService.deleteTaskList(action.taskListId).pipe(
        map(taskListMetadata => TaskListActions.taskListDeleteSuccess({ taskListMetadata })),
        catchError(errorMessage => of(TaskListActions.taskListDeleteFailed({ errorMessage })))
      ))
    );
  });

  constructor(private actions$: Actions, private boardService: BoardService) { }
}
