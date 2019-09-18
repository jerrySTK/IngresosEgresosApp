import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<AppState>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select<boolean>('ui', 'isLoading');
  }

  register(form: NgForm) {
    this.authService.createUser(form.value);
  }
}
