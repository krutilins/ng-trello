import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerifyEmailComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
