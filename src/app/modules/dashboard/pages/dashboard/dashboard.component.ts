import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { toggleSidebar } from 'src/app/core/store/actions/sidebar.actions';
import { userSignOut } from 'src/app/core/store/actions/user.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { selectSidebarOpen } from 'src/app/core/store/selectors/sidebar.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  public open$ = this.store.select(selectSidebarOpen);

  constructor(private store: Store<AppState>, private router: Router) { }

  public goToBoardsList(): void {
    this.router.navigate(['/dashboard']);
  }
}
