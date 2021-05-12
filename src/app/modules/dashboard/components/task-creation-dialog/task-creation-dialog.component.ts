import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ErrorStateMatcher } from '@angular/material/core';
import * as TaskActions from 'src/app/core/store/actions/task.actions';
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
      listId: string,
      type: string,
    }
  ) { }

  public handleModalAction(): void {
    if (this.data.type === TaskActions.taskCreate.type) {
      this.handleCreateTask();
    } else {
      this.handleUpdateTask();
    }
  }

  public handleCreateTask(): void {
    this.store.dispatch(TaskActions.taskCreate({
      listId: this.data.listId,
      title: this.data.title,
      description: this.data.description
    }));

    this.onClose();
  }

  public handleUpdateTask(): void {
    this.store.dispatch(TaskActions.taskUpdate({
      taskId: this.data.taskId,
      title: this.data.title,
      description: this.data.description
    }));

    this.onClose();
  }

  public handleDeleteTask(): void {
    this.store.dispatch(TaskActions.taskDelete({
      taskId: this.data.taskId
    }));

    this.onClose();
  }

  public handleDisableSaveButton(): boolean {
    return this.data.title === '' || this.data.description === '';
  }

  public handleDisableDeleteButton(): boolean {
    return this.data.type === TaskActions.taskCreate.type;
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
