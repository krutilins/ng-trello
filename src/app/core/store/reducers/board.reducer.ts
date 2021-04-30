import { BoardState } from '../models/board-state.model';
import * as BoardActions from '../actions/board.actions';
import * as TaskListActions from '../actions/task-list.actions';
import * as TaskActions from '../actions/task.actions';
import { createReducer, on } from '@ngrx/store';
import { TaskListMetadata } from '../../models/task-list-metadata.model';
import { TaskList } from '../../models/task-list.model';
import { BoardContent } from '../../models/board-content.model';

const initialState: BoardState = {
  boards: [],
};

function deepCopy<T>(target: T): T {
  if (target === null) {
    return target;
  }
  if (target instanceof Date) {
    return new Date(target.getTime()) as any;
  }
  if (target instanceof Array) {
    const cp = [] as any[];
    (target as any[]).forEach((v) => { cp.push(v); });
    return cp.map((n: any) => deepCopy<any>(n)) as any;
  }
  if (typeof target === 'object' && target !== {}) {
    const cp = { ...(target as { [key: string]: any }) } as { [key: string]: any };
    Object.keys(cp).forEach(k => {
      cp[k] = deepCopy<any>(cp[k]);
    });
    return cp as T;
  }
  return target;
}

function getTaskListFromMetadata(taskListMetadata: TaskListMetadata): TaskList {
  return {
    boardId: taskListMetadata.boardId,
    id: taskListMetadata.id,
    name: taskListMetadata.name,
    pos: taskListMetadata.pos,
    tasks: []
  };
}

function findChangedBoard(boards: BoardContent[], taskListMetadata: TaskListMetadata): BoardContent | undefined {
  return boards.find(board => board.id === taskListMetadata.boardId);
}

function findChangedList(taskLists: TaskList[], taskListMetadata: TaskListMetadata): TaskList | undefined {
  return taskLists.find(taskList => taskList.id === taskListMetadata.id);
}


function getListByID(lists: TaskList[], listID: string): TaskList | undefined {
  return lists.find(list => listID === list.id);
}

export const boardReducer = createReducer(
  initialState,
  on(BoardActions.boardLoadSuccess, (state, action) => ({
    boards: [...state.boards.filter(board => board.id !== action.boardContent.id), action.boardContent]
  })),
  on(BoardActions.boardLoadFailed, (state, { errorMessage }) => ({
    ...state
  })),
  on(BoardActions.boardDeleteSuccess, (state, action) => ({
    boards: state.boards.filter(board => board.id !== action.boardMetadata.id)
  })),
  on(BoardActions.boardDeleteFailed, (state, { errorMessage }) => ({
    ...state
  })),
  on(TaskListActions.taskListCreateSuccess, (state, { taskListMetadata }) => {
    const newState = deepCopy(state);

    const changedBoard = findChangedBoard(state.boards, taskListMetadata);

    if (changedBoard) {
      changedBoard.taskLists = [...changedBoard.taskLists, getTaskListFromMetadata(taskListMetadata)];
    }

    return newState;
  }),
  on(TaskListActions.taskListCreateFailed, (state, { errorMessage }) => ({
    ...state
  })),
  on(TaskListActions.taskListDeleteSuccess, (state, { taskListMetadata }) => {
    const newState = deepCopy(state);

    const changedBoard = findChangedBoard(state.boards, taskListMetadata);

    if (changedBoard) {
      changedBoard.taskLists = changedBoard.taskLists.filter(list => list.id !== taskListMetadata.id);
    }

    return newState;
  }),
  on(TaskListActions.taskListDeleteFailed, (state, { errorMessage }) => ({
    ...state
  })),
  on(TaskListActions.taskListNameChangeSuccess, (state, { taskListMetadata }) => {
    const newState = deepCopy(state);

    const changedBoard = findChangedBoard(state.boards, taskListMetadata);

    if (changedBoard) {
      const changedTaskList = findChangedList(changedBoard.taskLists, taskListMetadata);

      if (changedTaskList) {
        changedTaskList.name = taskListMetadata.name;
      }

    }

    return newState;
  }),
  on(TaskListActions.taskListNameChangeFailed, (state, { errorMessage }) => ({
    ...state
  })),
  on(TaskActions.taskCreateSuccess, (state, { task }) => {
    const newState = deepCopy(state);

    const changedBoard = state.boards.find(board => board.taskLists.find(taskList => taskList.id === task.listId));

    const changedList = changedBoard?.taskLists.find(taskList => taskList.id === task.listId);

    if (changedList) {
      changedList.tasks = [...changedList.tasks, task];
    }

    return newState;
  }),
  on(TaskActions.taskCreateFailed, (state, { errorMessage }) => ({
    ...state
  })),
  on(TaskActions.taskDeleteSuccess, (state, { deletedTask }) => {
    const newState = deepCopy(state);

    const changedBoard = state.boards.find(board => board.taskLists.find(taskList => taskList.id === deletedTask.listId));

    if (changedBoard) {
      const changedList = changedBoard.taskLists.find(taskList => taskList.id === deletedTask.listId);

      if (changedList) {
        changedList.tasks = changedList.tasks.filter(task => task.id !== deletedTask.id);
      }
    }

    return newState;
  }),
  on(TaskActions.taskDeleteFailed, (state, { errorMessage }) => ({
    ...state
  })),
  on(TaskActions.taskDragSuccess, (state, action) => {
    const newState = deepCopy(state);

    const changedBoard = newState.boards.find(board => {
      return board.taskLists.find(taskList => taskList.id === action.listIdBefore && taskList.id === action.listIdAfter);
    });

    if (changedBoard) {

      const before = getListByID(changedBoard.taskLists, action.listIdBefore);
      const after = getListByID(changedBoard.taskLists, action.listIdAfter);

      if (before) {
        before.tasks.filter(task => task.id !== action.task.id);
      }

      if (after) {
        after.tasks = [...after.tasks, action.task].sort((a, b) => a.pos - b.pos);
      }
    }

    return newState;
  }),
  on(TaskActions.taskDragFailed, (state, action) => ({
    ...state
  })),
  on(TaskActions.taskUpdateSuccess, (state, { changedTask }) => {
    const changedBoard = state.boards.find(board => board.taskLists.find(taskList => taskList.id === changedTask.listId));

    const newState = deepCopy(state);

    if (changedBoard) {
      const changedList = changedBoard.taskLists.find(taskList => taskList.id === changedTask.listId);

      if (changedList) {
        changedList.tasks = changedList.tasks.map(task => task.id === changedTask.id ? changedTask : task);
      }
    }

    return newState;
  }),
  on(TaskActions.taskUpdateFailed, (state, action) => ({
    ...state
  })),
);
