import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Column } from 'src/app/core/models/column.model';
import * as CardActions from 'src/app/core/store/actions/card.actions';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent {

  board: Observable<{ lists: Column[] }>;

  constructor(private store: Store<{ board: { lists: Column[] } }>) {
    this.board = this.store.select('board');
    console.log(this.board);
  }

  dragCard(
    droppableIdStart: string,
    droppableIdEnd: string,
    droppableIndexStart: number,
    droppableIndexEnd: number): void {
    this.store.dispatch(CardActions.dragCard({
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd
    }));
  }

  drop(event: CdkDragDrop<Column>): void {
    const previousContainer = event.previousContainer;
    const currentContainer = event.container;
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    if (previousContainer === currentContainer) {
      moveItemInArray(
        [...currentContainer.data.cards],
        previousIndex,
        currentIndex
      );

      this.dragCard(
        currentContainer.data.id,
        currentContainer.data.id,
        previousIndex,
        currentIndex
      );
    } else {
      transferArrayItem(
        [...previousContainer.data.cards],
        [...currentContainer.data.cards],
        previousIndex,
        currentIndex
      );

      this.dragCard(
        previousContainer.data.id,
        currentContainer.data.id,
        previousIndex,
        currentIndex
      );
    }
  }

}
