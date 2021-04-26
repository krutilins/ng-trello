import { TaskList } from './task-list.model';

export interface BoardContent {
  id: string;
  taskLists: TaskList[];
}
