import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BoardListComponent } from './components/board-list/board-list.component';
import { BoardComponent } from './components/board/board.component';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { BoardCreationDialogComponent } from './components/board-creation-dialog/board-creation-dialog.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskCreationDialogComponent } from './components/task-creation-dialog/task-creation-dialog.component';
import { TaskListCreationalDialogComponent } from './components/task-list-creational-dialog/task-list-creational-dialog.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BoardListComponent,
    BoardComponent,
    BoardCardComponent,
    BoardCreationDialogComponent,
    TaskListComponent,
    TaskCreationDialogComponent,
    TaskListCreationalDialogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
