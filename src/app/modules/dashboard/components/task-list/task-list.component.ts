import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskList } from 'src/app/core/models/task-list.model';
import { TaskCreationDialogComponent } from '../task-creation-dialog/task-creation-dialog.component';
import * as BoardActions from 'src/app/core/store/actions/board.actions';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {

  @Input() public list: TaskList | null = null;

  constructor(public dialog: MatDialog) { }

  public getText(): string {
    return this.list?.tasks.length !== undefined && this.list.tasks.length > 0 ? 'Add another card' : 'Add a card';
  }

  public updateCard(): void {
    this.openDialog();
  }

  public openDialog(): void {
    this.dialog.open(TaskCreationDialogComponent, {
      width: '500px',
      data: {
        listID: this.list?.id,
        title: '',
        text: '',
        type: BoardActions.taskCreate.type
      }
    });
  }

}
