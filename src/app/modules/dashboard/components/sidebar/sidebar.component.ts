import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { BoardMetadata } from 'src/app/core/models/board-metadata.model';
import { previewListLoad } from 'src/app/core/store/actions/preview-list.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { selectPreviewList } from 'src/app/core/store/selectors/preview-list.selectors';
import { selectUserMetadata } from 'src/app/core/store/selectors/user.selectors';
import { BoardCreationDialogComponent } from '../board-creation-dialog/board-creation-dialog.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit, OnDestroy {
  public boardPreviewList: BoardMetadata[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(this.store.select(selectUserMetadata).pipe(
      mergeMap(userMetadata => {
        if (userMetadata) {
          this.store.dispatch(previewListLoad({ userMetadata }));
        }
        return this.store.select(selectPreviewList);
      }),
      map(boardMetadata => {
        this.boardPreviewList = boardMetadata;
        this.changeDetectorRef.detectChanges();
      })
      // tslint:disable-next-line: deprecation
    ).subscribe());
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      if (subscription && subscription.unsubscribe) {
        subscription.unsubscribe();
      }
    });
  }

  public openBoard(boardId: string): void {
    this.router.navigate(['dashboard/board', boardId]);
  }

  public openBoardCreationalDialog(): void {
    this.dialog.open(BoardCreationDialogComponent);
  }
}