import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private afDb: AngularFirestore) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(fbUser => {
      console.log(fbUser);
    });
  }

  createUser(user: { email: string, name: string, password: string }) {
    this.afAuth
      .auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(resp => {

        const usr: User = {
          email: user.email,
          name: user.name,
          uid: resp.user.uid
        };

        this.afDb.doc(`${usr.uid}/user`).set(usr).then(resp => {
          this.router.navigate(['/']);
        });
      })
      .catch(error => {
        Swal.fire('Error al registrar', error.message, 'error');
      });
  }

  signIn(user: { email: string, password: string }) {
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(resp => {
      this.router.navigate(['/']);
    }).catch(error => {
      Swal.fire('Error al iniciar sesion', error.message, 'error');
    });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
}
