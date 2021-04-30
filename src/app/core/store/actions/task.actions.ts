import { createAction, props } from '@ngrx/store';
import { TaskMovingInfo } from '../../models/task-moving.info.model';
import { Task } from '../../models/task.model';

// CREATE TASK

export const taskCreate = createAction(
  '[Task] Task Create',
  props<{ listId: string, title: string, description: string }>()
);

export const taskCreateSuccess = createAction(
  '[Task API] Task Create Success',
  props<{ task: Task }>()
);

export const taskCreateFailed = createAction(
  '[Task API] Task Create Failed',
  props<{ errorMessage: string }>()
);

// DELETE TASK

export const taskDelete = createAction(
  '[Task] Task Delete',
  props<{ taskId: string }>()
);

export const taskDeleteSuccess = createAction(
  '[Task API] Task Delete Success',
  props<{ deletedTask: Task }>()
);

export const taskDeleteFailed = createAction(
  '[Task API] Task Delete Failed',
  props<{ errorMessage: string }>()
);

// UPDATE TASK

export const taskUpdate = createAction(
  '[Task] Task Update',
  props<{ taskId: string, title: string, description: string }>()
);

export const taskUpdateSuccess = createAction(
  '[Task API] Task Update Success',
  props<{ changedTask: Task }>()
);

export const taskUpdateFailed = createAction(
  '[Task API] Task Update Failed',
  props<{ errorMessage: string }>()
);

// DRAG TASK

export const taskDrag = createAction(
  '[Task] Task Drag',
  props<{
    taskMovingInfo: TaskMovingInfo
  }>()
);

export const taskDragSuccess = createAction(
  '[Task API] Task Drag Suceess',
  props<{
    task: Task,
    listIdBefore: string,
    listIdAfter: string
  }>()
);

export const taskDragFailed = createAction(
  '[Task API] Task Drag Failed',
  props<{ errorMessage: string }>()
);
