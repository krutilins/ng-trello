import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/core/models/task.model';
import * as BoardActions from 'src/app/core/store/actions/board.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { TaskCreationDialogComponent } from '../task-creation-dialog/task-creation-dialog.component';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardCardComponent {

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
      parentListId: ''
    };
  }

  public deleteCard(): void {
    this.store.dispatch(BoardActions.taskDelete({
      taskId: this.task.id,
      parentListId: this.task.parentListId
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
        listId: this.task.parentListId,
        taskId: this.task.id,
        title: this.task.title,
        description: this.task.description,
        type: BoardActions.taskUpdate.type
      }
    });
  }
}
