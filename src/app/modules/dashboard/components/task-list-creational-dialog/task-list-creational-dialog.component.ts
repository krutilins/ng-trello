import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/core/models/task.model';
import * as TaskListActions from 'src/app/core/store/actions/task-list.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';

@Component({
  selector: 'app-task-list-creational-dialog',
  templateUrl: './task-list-creational-dialog.component.html',
  styleUrls: ['./task-list-creational-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListCreationalDialogComponent {
  public taskListNameFormControl = new FormControl(this.data.name, [
    Validators.required,
  ]);

  public errorMatcher = new ErrorMatcher();

  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<TaskListCreationalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      name: string,
      boardId: string,
      listId: string,
      tasks: Task[],
      type: string,
    }
  ) { }

  public handleModalAction(): void {
    if (this.data.type === TaskListActions.taskListCreate.type) {
      this.handleCreateTaskList();
    } else {
      this.handleUpdateTaskList();
    }
  }

  public handleCreateTaskList(): void {
    this.store.dispatch(TaskListActions.taskListCreate({
      boardId: this.data.boardId,
      name: this.data.name
    }));

    this.onClose();
  }

  public handleUpdateTaskList(): void {
    this.store.dispatch(TaskListActions.taskListNameChange({
      newName: this.data.name,
      taskListId: this.data.listId
    }));

    this.onClose();
  }

  public handleDeleteTaskList(): void {
    this.store.dispatch(TaskListActions.taskListDelete({
      taskListId: this.data.listId
    }));

    this.onClose();
  }

  public handleDisableSaveButton(): boolean {
    return this.data.name === '';
  }

  public handleDisableDeleteButton(): boolean {
    return this.data.type === TaskListActions.taskListCreate.type;
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onInputChange(field: 'name', target: EventTarget | null): void {
    this.data[field] = (target as HTMLInputElement).value.trim();
  }
}

export class ErrorMatcher implements ErrorStateMatcher {
  public isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
