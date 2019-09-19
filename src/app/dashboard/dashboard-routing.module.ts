import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { DashboardComponent } from './dashboard.component';



export const dashboardRoutes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: EstadisticaComponent, canActivate: [AuthGuardService] },
      { path: 'ingreso-egreso', component: IngresoEgresoComponent, canActivate: [AuthGuardService] },
      { path: 'detalle', component: DetalleComponent, canActivate: [AuthGuardService] },
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
