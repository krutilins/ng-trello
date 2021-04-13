import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';
import { Store } from '@ngrx/store';
import { ErrorStateMatcher } from '@angular/material/core';
import { Column } from 'src/app/core/models/column.model';
import { TaskCard } from 'src/app/core/models/task-card.model';
import * as CardActions from 'src/app/core/store/actions/card.actions';

@Component({
  selector: 'app-card-creation-dialog',
  templateUrl: './card-creation-dialog.component.html',
  styleUrls: ['./card-creation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardCreationDialogComponent implements OnInit {
  titleFormControl = new FormControl(this.data.title, [
    Validators.required,
  ]);

  textFormControl = new FormControl(this.data.text, [
    Validators.required,
  ]);

  errorMatcher = new ErrorMatcher();

  constructor(
    private store: Store<{ board: { lists: Column[] } }>,
    public dialogRef: MatDialogRef<CardCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      listID: string,
      cardID: string,
      title: string,
      text: string,
      type: string
    }) {
  }

  ngOnInit(): void {

  }

  handleModalAction(): void {
    if (this.data.type === CardActions.addCard.type) {
      this.handleAddCard();
    } else {
      this.handleUpdateCard();
    }
  }

  handleAddCard(): void {
    const newCard = new TaskCard(`card-${uuidv4()}`, this.data.title, this.data.text);

    this.store.dispatch(CardActions.addCard({
      listID: this.data.listID,
      newCard
    }));

    this.onClose();
  }

  handleUpdateCard(): void {
    this.store.dispatch(CardActions.updateCard({
      listID: this.data.listID,
      cardID: this.data.cardID,
      title: this.data.title,
      text: this.data.text
    }));

    this.onClose();
  }

  handleDeleteCard(): void {
    this.store.dispatch(CardActions.deleteCard({
      listID: this.data.listID,
      cardID: this.data.cardID
    }));

    this.onClose();
  }

  handleDisableSaveButton(): boolean {
    return this.data.title === '' || this.data.text === '';
  }

  handleDisableDeleteButton(): boolean {
    return this.data.type === CardActions.addCard.type;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onInputChange(field: 'title' | 'text', target: EventTarget | null): void {
    this.data[field] = (target as HTMLInputElement).value.trim();
  }
}

export class ErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
