import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IncomeOutcome } from './income-outcome.model';
import { IncomeOutcomeService } from './income-outcome.service';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducers';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivateLoginAction, DeactivateLoginAction } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {

  isLoading$: Observable<boolean>;

  constructor(private ioService: IncomeOutcomeService, private store: Store<AppState>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select<boolean>('ui', 'isLoading');
  }

  save(form: NgForm) {
    this.store.dispatch(new ActivateLoginAction());
    const io = new IncomeOutcome({ ...form.value });
    this.ioService.createIncomeOutcome(io).then(resp => {
      Swal.fire('Registro', 'Registro creado con exito', 'info');
      form.reset({ amount: 0 });
      this.store.dispatch(new DeactivateLoginAction());
    }).catch(error => {
      Swal.fire('Registro', error.message, 'error');
    });
  }

}
