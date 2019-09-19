import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { IncomeOutcomeService } from 'src/app/ingreso-egreso/income-outcome.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  user$: Observable<User>;
  constructor(private authService: AuthService,
              private ioService: IncomeOutcomeService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.user$ = this.store.select<User>('loggedUser', 'user');
  }

  signout() {
    this.ioService.cancelSubscriptions();
    this.authService.logout();
  }

}
