import { TaskList } from './task-list.model';
export interface BoardContent {
  id: string;
  name: string;
  owner: string;
  admins: string[];
  members: string[];
  taskLists: TaskList[];
}
