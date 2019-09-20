import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { IncomeOutcome } from '../income-outcome.model';
import { Observable } from 'rxjs';
import { IncomeOutcomeService } from '../income-outcome.service';
import * as fromReducer from '../../app.reducers';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit {
  items$: Observable<IncomeOutcome[]>;
  constructor(private store: Store<AppState>, private ioService: IncomeOutcomeService) { }

  ngOnInit() {
    this.items$ = this.store.select<IncomeOutcome[]>(fromReducer.getItems);
  }

  delete(uid: string) {
    this.ioService.deleteIncomeOutcome(uid);
  }
}
