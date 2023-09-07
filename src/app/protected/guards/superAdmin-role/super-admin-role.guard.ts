import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, filter, map } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AdminsMessageComponent } from '../../messages/admins-message/admins-message/admins-message.component';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminRoleGuard implements CanActivate, CanLoad {


  constructor( 
              private dialog : MatDialog,
              private store : Store<AppState>
    ){

}

openDialogLogin() {
  this.dialog.open(AdminsMessageComponent, {
    disableClose: true,
    panelClass:"custom-modalbox-message", // no se toman pedidos
  });
}
     

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
return this.store.select('user').pipe(
filter( ({user})=>  user != null && user != undefined),
map(({ user }) => {
  if (user.role === 'STAFF_ROLE') {
  this.openDialogLogin();
  return false;
} else {
  return true;
}
})
);
}

canLoad(
route: Route,
segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
return this.store.select('user').pipe(
filter( ({user})=>  user != null && user != undefined),
map(({ user }) => {
if (user.role === 'STAFF_ROLE') {
  this.openDialogLogin();
  return false;
} else {
  return true;
}
})
);
}

}
