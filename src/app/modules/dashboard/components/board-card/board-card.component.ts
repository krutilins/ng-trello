import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Column } from 'src/app/core/models/column.model';
import { TaskCard } from 'src/app/core/models/task-card.model';
import * as CardActions from 'src/app/core/store/actions/card.actions';
import { CardCreationDialogComponent } from '../card-creation-dialog/card-creation-dialog.component';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardCardComponent implements OnInit {


  @Input() index: number;
  @Input() listID: string;
  @Input() card: TaskCard;

  constructor(
    private store: Store<{ board: { lists: Column[] } }>,
    public dialog: MatDialog
  ) {
    this.index = -1;
    this.listID = '';
    this.card = {
      id: '',
      text: '',
      title: ''
    };
  }

  ngOnInit(): void {

  }

  deleteCard(): void {
    this.store.dispatch(CardActions.deleteCard({
      cardID: this.card.id,
      listID: this.listID
    }));
  }

  updateCard(): void {
    this.openDialog();
  }

  getText(): string {
    const CHAR_LIMIT = 200;
    const cardText = this.card.text;
    return cardText.length > CHAR_LIMIT ? `${cardText.substring(0, CHAR_LIMIT - 3)}...` : cardText;
  }

  openDialog(): void {
    this.dialog.open(CardCreationDialogComponent, {
      width: '500px',
      data: {
        listID: this.listID,
        cardID: this.card.id,
        title: this.card.title,
        text: this.card.text,
        type: CardActions.updateCard.type
      }
    });
  }
}
