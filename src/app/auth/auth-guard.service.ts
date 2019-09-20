import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(private router: Router, private afAuth: AngularFireAuth) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.afAuth.authState.pipe(
      map(resp => {
        if (resp != null) {
          return true;
        }
        this.router.navigate(['/login']);
      })
    );
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return this.afAuth.authState.pipe(
      map(resp => {
        if (resp != null) {
          return true;
        }
        this.router.navigate(['/login']);
      }),
      take(1)
    );
  }
}

