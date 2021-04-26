import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';
import { Store } from '@ngrx/store';
import { ErrorStateMatcher } from '@angular/material/core';
import { Task } from 'src/app/core/models/task.model';
import * as BoardActions from 'src/app/core/store/actions/board.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';

@Component({
  selector: 'app-task-creation-dialog',
  templateUrl: './task-creation-dialog.component.html',
  styleUrls: ['./task-creation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCreationDialogComponent {
  public titleFormControl = new FormControl(this.data.title, [
    Validators.required,
  ]);

  public descriptionFormControl = new FormControl(this.data.description, [
    Validators.required,
  ]);

  public errorMatcher = new ErrorMatcher();

  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<TaskCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string,
      description: string,
      taskId: string,
      parentListId: string,
      type: string,
    }
  ) { }

  public handleModalAction(): void {
    if (this.data.type === BoardActions.taskCreate.type) {
      this.handleCreateTask();
    } else {
      this.handleUpdateTask();
    }
  }

  public handleCreateTask(): void {
    const newTask: Task = {
      id: uuidv4(),
      title: this.data.title,
      description: this.data.description,
      parentListId: this.data.parentListId
    };

    this.store.dispatch(BoardActions.taskCreate({
      listId: this.data.parentListId,
      newTask
    }));

    this.onClose();
  }

  public handleUpdateTask(): void {
    this.store.dispatch(BoardActions.taskUpdate({
      listId: this.data.parentListId,
      taskId: this.data.taskId,
      title: this.data.title,
      description: this.data.description
    }));

    this.onClose();
  }

  public handleDeleteTask(): void {
    this.store.dispatch(BoardActions.taskDelete({
      parentListId: this.data.parentListId,
      taskId: this.data.taskId
    }));

    this.onClose();
  }

  public handleDisableSaveButton(): boolean {
    return this.data.title === '' || this.data.description === '';
  }

  public handleDisableDeleteButton(): boolean {
    return this.data.type === BoardActions.taskCreate.type;
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onInputChange(field: 'title' | 'description', target: EventTarget | null): void {
    this.data[field] = (target as HTMLInputElement).value.trim();
  }
}

export class ErrorMatcher implements ErrorStateMatcher {
  public isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
