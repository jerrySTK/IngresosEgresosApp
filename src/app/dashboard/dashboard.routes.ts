import { Routes } from '@angular/router';
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';
import { AuthGuardService } from '../auth/auth-guard.service';



export const dashboardRoutes: Routes = [
    { path: '', component: EstadisticaComponent, canActivate: [AuthGuardService] },
    { path: 'ingreso-egreso', component: IngresoEgresoComponent, canActivate: [AuthGuardService] },
    { path: 'detalle', component: DetalleComponent, canActivate: [AuthGuardService] },
];
