import { Store } from '@ngrx/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addBoard } from 'src/app/core/store/actions/board-list.actions';
import { AppState } from 'src/app/core/store';


@Component({
  selector: 'app-board-creation-dialog',
  templateUrl: './board-creation-dialog.component.html',
  styleUrls: ['./board-creation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardCreationDialogComponent {
  boardForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) {
    this.boardForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onCreate(): void {
    if (this.boardForm.dirty && this.boardForm.valid) {
      this.store.dispatch(addBoard({ name: this.boardForm.value.name }));
    }
  }

}
