import { createAction, props } from '@ngrx/store';
import { BoardContent } from '../../models/board-content.model';
import { BoardPreview } from '../../models/board-preview.model';
import { TaskList } from '../../models/task-list.model';
import { Task } from '../../models/task.model';

// CREATE BOARD

export const boardCreate = createAction(
  '[Board] Board Create',
  props<{ name: string }>()
);

export const boardCreateSuccess = createAction(
  '[Board API] Board Create Success',
  props<{ boardPreview: BoardPreview }>()
);

export const boardCreateFailed = createAction(
  '[Board API] Board Create Failed',
  props<{ errorMessage: string }>()
);

// LOAD BOARD

export const boardLoad = createAction(
  '[Board] Board Load',
  props<{ boardId: string }>()
);

export const boardLoadSuccess = createAction(
  '[Board API] Board Load Success',
  props<{ boardContent: BoardContent }>()
);

export const boardLoadFailed = createAction(
  '[Board API] Board Load Failed',
  props<{ errorMessage: string }>()
);

// DELELTE BOARD

export const boardDelete = createAction(
  '[Board] Board Delete',
  props<{ boardPreview: BoardPreview }>()
);

export const boardDeleteSuccess = createAction(
  '[Board API] Board Delete Success',
  props<{ boardPreview: BoardPreview }>()
);

export const boardDeleteFailed = createAction(
  '[Board API] Board Delete Failed',
  props<{ errorMessage: string }>()
);

// UPDATE BOARD

export const boardContentUpdate = createAction(
  '[Board] Board Content Update',
  props<{ boardContent: BoardContent }>()
);

export const boardContentUpdateSuccess = createAction(
  '[Board API] Board Content Update Success',
  props<{ boardContent: BoardContent }>()
);

export const boardContentUpdateFailed = createAction(
  '[Board API] Board Content Update Failed',
  props<{ errorMessage: string }>()
);

// LOAD BOARD PREVIEW LIST

export const previewListLoad = createAction(
  '[Board] Preview LIst Load'
);

export const previewListLoadSuccess = createAction(
  '[Board API] Preview List Load Success',
  props<{ boardsPreview: BoardPreview[] }>()
);

export const previewListLoadFailed = createAction(
  '[Board API] Preview List Load Failed',
  props<{ errorMessage: string }>()
);

// CREATE TASK LIST

export const taskListCreate = createAction(
  '[Task List] Task List Create',
  props<{ boardId: string, taskListName: string }>()
);

export const taskListCreateSuccess = createAction(
  '[Task List API] Task List Create Success',
  props<{ taskListName: string }>()
);

export const taskListCreateFailed = createAction(
  '[Task List API] Task List Create Failed',
  props<{ errorMessage: string }>()
);

// DELETE TASK LIST

export const taskListDelete = createAction(
  '[Task List] Task List Delete',
  props<{ taskList: TaskList }>()
);

export const taskListDeleteSuccess = createAction(
  '[Task List API] Task List Delete Success',
  props<{ taskList: TaskList }>()
);

export const taskListDeleteFailed = createAction(
  '[Task List API] Task List Delete Failed',
  props<{ erorrMessage: string }>()
);

// TASK LIST UPDATE

export const taskListUpdate = createAction(
  '[Task List] Task List Update',
  props<{ taskList: TaskList }>()
);

export const taskListUdateSuccess = createAction(
  '[Task List API] Task List Update Success',
  props<{ taskList: TaskList }>()
);

export const taskListUpdateFailed = createAction(
  '[Task List API] Task List Update Failed',
  props<{ errorMessage: string }>()
);

// CREATE TASK

export const taskCreate = createAction(
  '[Task] Task Create',
  props<{ listId: string, newTask: Task }>()
);

export const taskAddSuccess = createAction(
  '[Task API] Task Create Success',
  props<{ listId: string, newTask: Task }>()
);

export const taskAddFailed = createAction(
  '[Task API] Task Create Failed',
  props<{ errorMessage: string }>()
);

// DELETE TASK

export const taskDelete = createAction(
  '[Task] Task Delete',
  props<{ parentListId: string, taskId: string }>()
);

export const taskDeleteSuccess = createAction(
  '[Task API] Task Delete Success',
  props<{ listId: string, taskId: string }>()
);

export const taskDeleteFailed = createAction(
  '[Task API] Task Delete Failed',
  props<{ errorMessage: string }>()
);

// UPDATE TASK

export const taskUpdate = createAction(
  '[Task] Task Update',
  props<{ listId: string, taskId: string, title: string, description: string }>()
);

export const taskUpdateSuccess = createAction(
  '[Task API] Task Update Success',
  props<{ listId: string, taskId: string, title: string, description: string }>()
);

export const taskUpdateFailed = createAction(
  '[Task API] Task Update Failed',
  props<{ errorMessage: string }>()
);

// DRAG TASK

export const taskDrag = createAction(
  '[Task] Task Drag',
  props<{
    droppableIdStart: string,
    droppableIdEnd: string,
    droppableIndexStart: number,
    droppableIndexEnd: number
  }>()
);

export const taskDragSuccess = createAction(
  '[Task API] Task Drag Suceess',
  props<{
    droppableIdStart: string,
    droppableIdEnd: string,
    droppableIndexStart: number,
    droppableIndexEnd: number
  }>()
);

export const taskDragFailed = createAction(
  '[Task API] Task Drag Failed',
  props<{ errorMessage: string }>()
);
