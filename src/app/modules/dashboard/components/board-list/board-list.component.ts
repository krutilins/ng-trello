import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoardList } from 'src/app/core/models/board-list.model';
import { BoardCreationDialogComponent } from '../board-creation-dialog/board-creation-dialog.component';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardListComponent {

  boardList: BoardList = {
    boards: [
      {
        uid: '1234-asdf-1234-asdf',
        name: 'First board name'
      },
      {
        uid: 'asdf-1234-asdf-1234',
        name: 'Second board name'
      }
    ]
  };

  constructor(private dialog: MatDialog) { }

  openDialog(): void {
    this.dialog.open(BoardCreationDialogComponent);
  }

}
