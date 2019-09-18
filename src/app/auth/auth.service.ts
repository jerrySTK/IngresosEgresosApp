import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  createUser(user: { email: string, name: string, password: string }) {
    this.afAuth
        .auth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(resp => console.log(resp))
        .catch(error => console.error(error));
  }
}
