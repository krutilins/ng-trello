import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FirebaseAuthService } from 'src/app/core/services/firebase-auth.service';
import { userLoad } from 'src/app/core/store/actions/user.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';

@Component({
  selector: 'app-social-auth',
  templateUrl: './social-auth.component.html',
  styleUrls: ['./social-auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialAuthComponent {

  constructor(private authService: FirebaseAuthService, private store: Store<AppState>) { }

  public signInGoogle(): void {
    this.authService.googleAuth().then(() => {
      this.store.dispatch(userLoad());
    });
  }

  public signInVK(): void {
    const apiUrl = 'https://oauth.vk.com/authorize';
    const clientId = '7847226';
    const display = 'page';
    const redirectUri = 'http://localhost:4200/auth/vk';
    const responseType = 'token';
    const apiVersion = '5.130';
    const state = '1234';
    const scope = 'email';

    const url = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&display=${display}&response_type=${responseType}&v=${apiVersion}&state=${state}&revoke=1`;

    window.open(url, '_self');
  }
}
