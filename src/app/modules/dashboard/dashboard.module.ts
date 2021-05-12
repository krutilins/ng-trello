import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BoardListComponent } from './components/board-list/board-list.component';
import { BoardComponent } from './components/board/board.component';
import { TaskComponent } from './components/task/task.component';
import { BoardCreationDialogComponent } from './components/board-creation-dialog/board-creation-dialog.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskCreationDialogComponent } from './components/task-creation-dialog/task-creation-dialog.component';
import { TaskListCreationalDialogComponent } from './components/task-list-creational-dialog/task-list-creational-dialog.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BoardListComponent,
    BoardComponent,
    TaskComponent,
    BoardCreationDialogComponent,
    TaskListComponent,
    TaskCreationDialogComponent,
    TaskListCreationalDialogComponent,
    ProfileComponent,
    SidebarComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
