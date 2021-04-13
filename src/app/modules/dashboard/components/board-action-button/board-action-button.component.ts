import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as CardActions from 'src/app/core/store/actions/card.actions';
import { CardCreationDialogComponent } from '../card-creation-dialog/card-creation-dialog.component';

@Component({
  selector: 'app-board-action-button',
  templateUrl: './board-action-button.component.html',
  styleUrls: ['./board-action-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardActionButtonComponent {


  @Input() listID: string;
  @Input() cardsLength: number;

  constructor(public dialog: MatDialog) {
    this.listID = '';
    this.cardsLength = 0;
  }

  getText(): string {
    return this.cardsLength !== undefined && this.cardsLength > 0 ? 'Add another card' : 'Add a card';
  }

  updateCard(): void {
    this.openDialog();
  }

  openDialog(): void {
    this.dialog.open(CardCreationDialogComponent, {
      width: '500px',
      data: {
        listID: this.listID,
        title: '',
        text: '',
        type: CardActions.addCard.type
      }
    });
  }

}
