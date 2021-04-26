import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardListComponent } from './components/board-list/board-list.component';
import { BoardComponent } from './components/board/board.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'board/:id',
        component: BoardComponent
      },
      {
        path: '',
        component: BoardListComponent,
        pathMatch: 'full'
      }
    ],
    component: DashboardComponent
  },
  {
    path: '**',
    redirectTo: '/board-list'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
