import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { ActivateLoginAction, DeactivateLoginAction } from '../shared/ui.actions';
import { SetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersubscription: Subscription = new Subscription();

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private afDb: AngularFirestore,
    private store: Store<AppState>) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(fbUser => {
      if (fbUser) {
        this.usersubscription = this.afDb.doc(`${fbUser.uid}/user`).valueChanges().subscribe((user: any) => {
          this.store.dispatch(new SetUserAction(user));
        });
      } else {
        this.usersubscription.unsubscribe();
      }
    });
  }

  createUser(user: { email: string, name: string, password: string }) {
    this.store.dispatch(new ActivateLoginAction());

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
          this.store.dispatch(new DeactivateLoginAction());
          this.router.navigate(['/']);
        });
      })
      .catch(error => {
        this.store.dispatch(new DeactivateLoginAction());
        Swal.fire('Error al registrar', error.message, 'error');
      });
  }

  signIn(user: { email: string, password: string }) {
    this.store.dispatch(new ActivateLoginAction());
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(resp => {
      this.store.dispatch(new DeactivateLoginAction());
      this.router.navigate(['/']);
    }).catch(error => {
      this.store.dispatch(new DeactivateLoginAction());
      Swal.fire('Error al iniciar sesion', error.message, 'error');
    });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
}
