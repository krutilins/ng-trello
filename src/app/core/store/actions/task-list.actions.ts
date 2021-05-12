import { createAction, props } from '@ngrx/store';
import { BoardMetadata } from '../../models/board-metadata.model';
import { TaskListMetadata } from '../../models/task-list-metadata.model';

// CREATE

export const taskListCreate = createAction(
  '[Task List] Task List Create',
  props<{ boardId: string, name: string }>()
);

export const taskListCreateSuccess = createAction(
  '[Task List API] Task List Create Success',
  props<{ taskListMetadata: TaskListMetadata }>()
);

export const taskListCreateFailed = createAction(
  '[Task List API] Task List Create Failed',
  props<{ errorMessage: string }>()
);

// CHANGE TASK LIST NAME

export const taskListNameChange = createAction(
  '[Task List] Task List Name Change',
  props<{ taskListId: string, newName: string }>()
);

export const taskListNameChangeSuccess = createAction(
  '[Task List API] Task List Name Change Success',
  props<{ taskListMetadata: TaskListMetadata }>()
);

export const taskListNameChangeFailed = createAction(
  '[Task List API] [Task List] Task List Name Change Failed',
  props<{ errorMessage: string }>()
);

// DELETE TASK LIST

export const taskListDelete = createAction(
  '[Task List] Task List Delete',
  props<{ taskListId: string }>()
);

export const taskListDeleteSuccess = createAction(
  '[Task List API] Task List Delete Success',
  props<{ taskListMetadata: TaskListMetadata }>()
);

export const taskListDeleteFailed = createAction(
  '[Task List API] Task List Delete Failed',
  props<{ errorMessage: string }>()
);
