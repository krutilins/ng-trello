import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BoardPreview } from 'src/app/core/models/board-preview.model';
import { previewListLoad } from 'src/app/core/store/actions/board.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { selectPreviewList } from 'src/app/core/store/selectors/board.selectors';
import { BoardCreationDialogComponent } from '../board-creation-dialog/board-creation-dialog.component';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardListComponent implements OnInit {

  public boardPreviewList: BoardPreview[] = [];

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) {
    this.store.dispatch(previewListLoad());
  }

  public ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.store.select(selectPreviewList).subscribe(boardPreviewList => {
      this.boardPreviewList = boardPreviewList.boardsPreview;
      this.changeDetectorRef.detectChanges();
    });
  }

  public openBoard(boardId: string): void {
    this.router.navigate(['dashboard/board', boardId]);
  }

  public openBoardCreationalDialog(): void {
    this.dialog.open(BoardCreationDialogComponent);
  }

}
