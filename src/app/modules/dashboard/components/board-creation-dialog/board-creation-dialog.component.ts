import { Store } from '@ngrx/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from 'src/app/core/store/models/app-state.model';
import * as BoardActions from 'src/app/core/store/actions/board.actions';


@Component({
  selector: 'app-board-creation-dialog',
  templateUrl: './board-creation-dialog.component.html',
  styleUrls: ['./board-creation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardCreationDialogComponent {
  public boardForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) {
    this.boardForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  public onCreate(): void {
    if (this.boardForm.dirty && this.boardForm.valid) {
      this.store.dispatch(BoardActions.boardCreate({ name: this.boardForm.value.name }));
    }
  }

}
