import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/core/models/task.model';
import * as TaskActions from 'src/app/core/store/actions/task.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { TaskCreationDialogComponent } from '../task-creation-dialog/task-creation-dialog.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {

  @Input()
  public index: number;

  @Input()
  public task: Task;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog
  ) {
    this.index = -1;
    this.task = {
      id: '',
      title: '',
      description: '',
      listId: '',
      pos: 0
    };
  }

  public deleteCard(): void {
    this.store.dispatch(TaskActions.taskDelete({
      taskId: this.task.id,
    }));
  }

  public updateCard(): void {
    this.openDialog();
  }

  public getDescription(): string {
    const CHAR_LIMIT = 200;
    const cardText = this.task.description;
    return cardText.length > CHAR_LIMIT ? `${cardText.substring(0, CHAR_LIMIT - 3)}...` : cardText;
  }

  public openDialog(): void {
    this.dialog.open(TaskCreationDialogComponent, {
      width: '500px',
      data: {
        listId: this.task.listId,
        taskId: this.task.id,
        title: this.task.title,
        description: this.task.description,
        type: TaskActions.taskUpdate.type
      }
    });
  }
}
