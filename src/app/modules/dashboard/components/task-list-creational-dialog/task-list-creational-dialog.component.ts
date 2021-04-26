import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/core/models/task.model';
import * as BoardActions from 'src/app/core/store/actions/board.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';

@Component({
  selector: 'app-task-list-creational-dialog',
  templateUrl: './task-list-creational-dialog.component.html',
  styleUrls: ['./task-list-creational-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListCreationalDialogComponent {
  public taskListNameFormControl = new FormControl(this.data.taskListName, [
    Validators.required,
  ]);

  public errorMatcher = new ErrorMatcher();

  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<TaskListCreationalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      taskListName: string,
      type: string,
      taskListId: string,
      tasks: Task[],
      parentBoardId: string
    }
  ) { }

  public handleModalAction(): void {
    if (this.data.type === BoardActions.taskListCreate.type) {
      this.handleCreateTaskList();
    } else {
      this.handleUpdateTaskList();
    }
  }

  public handleCreateTaskList(): void {
    this.store.dispatch(BoardActions.taskListCreate({
      taskListName: this.data.taskListName,
      boardId: this.data.taskListId
    }));

    this.onClose();
  }

  public handleUpdateTaskList(): void {
    this.store.dispatch(BoardActions.taskListUpdate({
      taskList: {
        id: this.data.taskListId,
        name: this.data.taskListName,
        tasks: this.data.tasks,
        parentBoardId: this.data.parentBoardId
      }
    }));

    this.onClose();
  }

  public handleDeleteTaskList(): void {
    this.store.dispatch(BoardActions.taskListDelete({
      taskList: {
        id: this.data.taskListId,
        name: this.data.taskListName,
        tasks: this.data.tasks,
        parentBoardId: this.data.parentBoardId
      }
    }));

    this.onClose();
  }

  public handleDisableSaveButton(): boolean {
    return this.data.taskListName === '';
  }

  public handleDisableDeleteButton(): boolean {
    return this.data.type === BoardActions.taskListCreate.type;
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onInputChange(field: 'taskListName', target: EventTarget | null): void {
    this.data[field] = (target as HTMLInputElement).value.trim();
  }
}

export class ErrorMatcher implements ErrorStateMatcher {
  public isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
