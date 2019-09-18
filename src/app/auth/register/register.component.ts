import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register(form: NgForm) {
    this.authService.createUser(form.value);
  }
}
