import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { userSignInVk } from 'src/app/core/store/actions/user.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';

@Component({
  selector: 'app-vk-auth',
  templateUrl: './vk-auth.component.html',
  styleUrls: ['./vk-auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VkAuthComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    const params = new URLSearchParams(this.activatedRoute.snapshot.fragment);

    const accessToken = params.get('access_token');
    const id = params.get('user_id');
    const email = params.get('email');

    if (accessToken && email && id) {
      this.store.dispatch(userSignInVk({ accessToken, email, id }));
      this.router.navigate(['dashboard']);
    } else {
      this.router.navigate(['auth']);
    }

  }

}
