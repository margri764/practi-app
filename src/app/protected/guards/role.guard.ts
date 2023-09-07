import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, filter, map } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth/auth.service';
import { NoPermissionMessageComponent } from '../messages/no-permission-message/no-permission-message/no-permission-message.component';
// import { RestrictStaffComponent } from 'src/app/shared/messages/restrict-staff/restrict-staff/restrict-staff.component';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {



  openDialogNoAuth() {

    let width = '';
    let height = '';
    if(screen.width >= 800) {
      width = "400px";
      height ="550px";
    }

    this.dialog.open(NoPermissionMessageComponent,{
      width: `${width}`|| "",
      height:`${height}`|| "",
      panelClass:"custom-modalbox-message",
    });
  }


  constructor( 
              private authService : AuthService,
              private dialog : MatDialog,
              private store : Store<AppState>,
              ){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select('auth').pipe(
      filter( ({user})=>  user != null && user != undefined),
      map(({ user }) => {
        // console.log(state.url);
         
        switch (state.url) {
          case "/armar-pedido":   
                              if(!user?.permisos.includes(2100)) {
                                this.openDialogNoAuth()
                                return false;
                              }
                               return true;

          case "/listado-clientes":   
                            if(!user?.permisos.includes(900)){
                              this.openDialogNoAuth()
                              return false;
                            }
                            return true;

          case "/listado-articulos":   
                            if(!user?.permisos.includes(1200)){
                              this.openDialogNoAuth()
                              return false;
                            }
                            return true;

          case "/listado-precios":   
                            if(!user?.permisos.includes(700)){
                              this.openDialogNoAuth()
                              return false;
                             }
                            return true;

         case "/listado-pedidos":   
                            if(!user?.permisos.includes(2100)){
                              this.openDialogNoAuth();
                              return false;
                              }
                            return true;

          case "/pedidos-temporales":   
                          if(!user?.permisos.includes(2100)){
                            this.openDialogNoAuth();
                            return false;
                            }
                          return true;

         case "/buscar-articulos":   
                          if(!user?.permisos.includes(700)){
                            this.openDialogNoAuth();
                            return false;
                            }
                          return true;

        }

        this.openDialogNoAuth();
        return false

 
      })
    );
  }
// CMOMO HAGO ACA
//   canLoad(
//     route: Route,
//     segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
//       return this.store.select('auth').pipe(
//         filter( ({user})=>  user != null && user != undefined),
//         map(({ user }) => {
//           if(!user?.permisos.includes(2100)){
//               alert("no tenes permiso");
//             return false;

//           }
     
//             return true;
//         })
//       );

//       }
    }