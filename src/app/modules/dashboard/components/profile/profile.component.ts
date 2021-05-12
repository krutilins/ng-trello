import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserMetadata } from 'src/app/core/models/user-metadata.model';
import { userSignOut } from 'src/app/core/store/actions/user.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  public isOpen = false;

  @Input()
  public profile: UserMetadata | null = null;

  constructor(private store: Store<AppState>) { }

  public signOut(): void {
    this.store.dispatch(userSignOut());
  }

  public toggleProfile(): void {
    this.isOpen = !this.isOpen;
  }
}
