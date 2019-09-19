import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import * as fromReducer from '../../app.reducers';
@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  incomeAmount$: Observable<number>;
  outcomeAmount$: Observable<number>;

  incomeCount$: Observable<number>;
  outcomeCount$: Observable<number>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.incomeAmount$ = this.store.select(fromReducer.getIncomeAmountSelector);
    this.outcomeAmount$ = this.store.select(fromReducer.getOutcomeAmountSelector);
  }

}
