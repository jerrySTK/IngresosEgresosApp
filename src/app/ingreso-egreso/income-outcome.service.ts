import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IncomeOutcome } from './income-outcome.model';
import { AppState } from '../app.reducers';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth/auth.service';
import { filter, map } from 'rxjs/operators';
import { SetItemsActions, UnsetItemsActions } from './income-outcome.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeOutcomeService {
  ioSubscription: Subscription = new Subscription();
  itemsSubscription: Subscription = new Subscription();

  constructor(private afDb: AngularFirestore,
    private store: Store<AppState>,
    private authService: AuthService) { }

  createIncomeOutcome(io: IncomeOutcome) {
    return this.afDb.doc(`${this.authService.getUser().uid}/incomes-outcomes`)
      .collection('items').add({ ...io });
  }

  deleteIncomeOutcome(uid: string) {
    const usr = this.authService.getUser();
    this.afDb.doc(`${usr.uid}/incomes-outcomes/items/${uid}`).delete();
  }

  initIOListener() {
    this.ioSubscription = this.store.select('loggedUser').pipe(
      filter(e => e.user != null)
    ).subscribe(response => {
      this.ioItems(response.user.uid);
    });
  }

  private ioItems(uid: string) {
    this.itemsSubscription = this.afDb.collection(`${uid}/incomes-outcomes/items`)
      .snapshotChanges()
      .pipe(
        map(doc => {
          return doc.map(d => {
            return {
              uid: d.payload.doc.id,
              ...d.payload.doc.data()
            };
          });
        })
      )
      .subscribe((data: any[]) => {
        this.store.dispatch(new SetItemsActions(data));
      });
  }

  cancelSubscriptions() {
    this.store.dispatch(new UnsetItemsActions());
    this.ioSubscription.unsubscribe();
    this.itemsSubscription.unsubscribe();
  }
}
