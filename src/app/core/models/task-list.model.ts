import { Task } from './task.model';

export interface TaskList {
  id: string;
  name: string;
  pos: number;
  boardId: string;
  tasks: Task[];
}
