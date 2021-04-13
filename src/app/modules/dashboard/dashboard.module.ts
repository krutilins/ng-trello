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
import { BoardActionButtonComponent } from './components/board-action-button/board-action-button.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardCreationDialogComponent } from './components/card-creation-dialog/card-creation-dialog.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BoardListComponent,
    BoardComponent,
    BoardCardComponent,
    BoardCreationDialogComponent,
    BoardActionButtonComponent,
    CardListComponent,
    CardCreationDialogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
