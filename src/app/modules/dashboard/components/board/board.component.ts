import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BoardContent } from 'src/app/core/models/board-content.model';
import { TaskList } from 'src/app/core/models/task-list.model';
import * as BoardActions from 'src/app/core/store/actions/board.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { selectBoardContent } from 'src/app/core/store/selectors/board.selectors';
import { TaskListCreationalDialogComponent } from '../task-list-creational-dialog/task-list-creational-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit, OnDestroy {

  public boardContent: BoardContent | null = null;

  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.subscriptions.push(
      // tslint:disable-next-line: deprecation
      this.activatedRoute.paramMap.subscribe(param => {
        const id = param.get('id');
        if (id) {
          this.store.dispatch(BoardActions.boardLoad({ boardId: id }));
        }
      })
    );
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      // tslint:disable-next-line: deprecation
      this.store.select(selectBoardContent).subscribe(boardState => {
        this.boardContent = boardState.boardContent;
        this.changeDetectorRef.detectChanges();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      if (subscription && subscription.unsubscribe) {
        subscription.unsubscribe();
      }
    });
  }

  public updateTaskList(): void {
    this.openDialog();
  }

  public openDialog(): void {
    this.dialog.open(TaskListCreationalDialogComponent, {
      width: '500px',
      data: {
        taskListName: '',
        type: BoardActions.taskListCreate.type,
        taskListId: '',
        tasks: []
      }
    });
  }

  public dragCard(
    droppableIdStart: string,
    droppableIdEnd: string,
    droppableIndexStart: number,
    droppableIndexEnd: number
  ): void {
    this.store.dispatch(BoardActions.taskDrag({
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd
    }));
  }

  public drop(event: CdkDragDrop<TaskList>): void {
    const previousContainer = event.previousContainer;
    const currentContainer = event.container;
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    if (previousContainer === currentContainer) {
      moveItemInArray(
        [...currentContainer.data.tasks],
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
        [...previousContainer.data.tasks],
        [...currentContainer.data.tasks],
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
