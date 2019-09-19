import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { ActivateLoginAction, DeactivateLoginAction } from '../shared/ui.actions';
import { SetUserAction, UnsetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private usersubscription: Subscription = new Subscription();

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private afDb: AngularFirestore,
    private store: Store<AppState>) { }
  private user: User;

  initAuthListener() {
    this.afAuth.authState.subscribe(fbUser => {
      if (fbUser) {
        this.usersubscription = this.afDb.doc(`${fbUser.uid}/user`).valueChanges().subscribe((user: any) => {
          const usr = new User(user);
          this.user = usr;
          this.store.dispatch(new SetUserAction(usr));
        });
      } else {
        this.user = null;
        this.usersubscription.unsubscribe();
      }
    });
  }

  getUser() {
    return { ...this.user };
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
    this.store.dispatch(new UnsetUserAction());
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.usersubscription.unsubscribe();
  }
}
