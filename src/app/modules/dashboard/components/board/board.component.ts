import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { BoardContent } from 'src/app/core/models/board-content.model';
import { TaskList } from 'src/app/core/models/task-list.model';
import { TaskMovingInfo } from 'src/app/core/models/task-moving.info.model';
import * as BoardActions from 'src/app/core/store/actions/board.actions';
import * as TaskListActions from 'src/app/core/store/actions/task-list.actions';
import * as TaskActions from 'src/app/core/store/actions/task.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { selectBoardById } from 'src/app/core/store/selectors/board.selectors';
import { TaskListCreationalDialogComponent } from '../task-list-creational-dialog/task-list-creational-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit, OnDestroy {

  public boardContent: BoardContent | undefined;
  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.paramMap.pipe(
        map(param => String(param.get('id'))),
        mergeMap(boardId => {
          this.store.dispatch(BoardActions.boardLoad({ boardId }));
          return this.store.select(selectBoardById, { boardId });
        })
        // tslint:disable-next-line: deprecation
      ).subscribe(boardContent => {
        this.boardContent = boardContent;
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
    if (this.boardContent) {
      this.dialog.open(TaskListCreationalDialogComponent, {
        width: '500px',
        data: {
          name: '',
          type: TaskListActions.taskListCreate.type,
          listId: '',
          tasks: [],
          boardId: this.boardContent.id
        }
      });
    }
  }

  public dragCard(
    taskMovingInfo: TaskMovingInfo
  ): void {
    this.store.dispatch(TaskActions.taskDrag({ taskMovingInfo }));
  }

  public drop(event: CdkDragDrop<TaskList>): void {
    const prevContainer = event.previousContainer;
    const currentContainer = event.container;
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    if (prevContainer === currentContainer) {
      let taskMovingInfo: TaskMovingInfo;

      if (currentIndex > previousIndex) {
        taskMovingInfo = {
          listIdAfter: currentContainer.data.id,
          listIdBefore: prevContainer.data.id,
          taskId: prevContainer.data.tasks[previousIndex].id,
          taskIdAfter: prevContainer.data.tasks?.length - 1 === currentIndex ? undefined : prevContainer.data.tasks[currentIndex + 1]?.id,
          taskIdBefore: prevContainer.data.tasks[currentIndex]?.id
        };
      } else {
        taskMovingInfo = {
          listIdAfter: currentContainer.data.id,
          listIdBefore: prevContainer.data.id,
          taskId: prevContainer.data.tasks[previousIndex].id,
          taskIdAfter: prevContainer.data.tasks[currentIndex]?.id,
          taskIdBefore: currentIndex ? prevContainer.data.tasks[currentIndex - 1]?.id : undefined
        };
      }

      moveItemInArray(
        [...currentContainer.data.tasks],
        previousIndex,
        currentIndex
      );

      this.dragCard(taskMovingInfo);
    } else {
      transferArrayItem(
        [...prevContainer.data.tasks],
        [...currentContainer.data.tasks],
        previousIndex,
        currentIndex
      );

      const taskMovingInfo: TaskMovingInfo = {
        listIdAfter: currentContainer.data.id,
        listIdBefore: prevContainer.data.id,
        taskId: prevContainer.data.tasks[previousIndex].id,
        taskIdAfter: (currentContainer.data.tasks?.length - 1) === currentIndex ? undefined : currentContainer.data.tasks[currentIndex]?.id,
        taskIdBefore: (currentContainer.data.tasks?.length - 1) === currentIndex ?
          currentContainer.data.tasks[currentIndex]?.id
          : currentContainer.data.tasks[currentIndex - 1]?.id
      };

      this.dragCard(taskMovingInfo);
    }
  }

}
