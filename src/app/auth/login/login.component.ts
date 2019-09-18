import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { AppState } from 'src/app/app.reducers';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  isLoading$: Observable<boolean>;
  constructor(private authService: AuthService, private store: Store<AppState>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select('ui', 'isLoading');
  }

  signIn(f: NgForm) {
    this.authService.signIn(f.value);
  }
}
