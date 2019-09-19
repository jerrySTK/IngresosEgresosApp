import { Component, OnInit } from '@angular/core';
import { IncomeOutcomeService } from '../ingreso-egreso/income-outcome.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(private ioService: IncomeOutcomeService) { 
    this.ioService.initIOListener();
  }

  ngOnInit() {
  }

}
