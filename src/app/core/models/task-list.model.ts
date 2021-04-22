import { Task } from './task.model';

export interface TaskList {
  id: string;
  name: string;
  tasks: Task[];
}
