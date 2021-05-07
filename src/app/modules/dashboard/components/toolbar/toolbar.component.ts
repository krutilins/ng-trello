import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleSidebar } from 'src/app/core/store/actions/sidebar.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { selectUserMetadata } from 'src/app/core/store/selectors/user.selectors';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  public user = this.store.select(selectUserMetadata);

  constructor(private store: Store<AppState>) { }

  public onToggleSidebar(): void {
    this.store.dispatch(toggleSidebar());
  }

}
