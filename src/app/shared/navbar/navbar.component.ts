import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { filter } from 'minimatch';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  user$: Observable<User>;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.user$ = this.store.select<User>('loggedUser', 'user');
  }

}
