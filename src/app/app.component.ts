import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { userLoad } from './core/store/actions/user.actions';
import { AppState } from './core/store/models/app-state.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) { }

  public ngOnInit(): void {
    this.store.dispatch(userLoad());
  }
}
