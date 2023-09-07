import { Component, HostListener, OnInit, Output } from '@angular/core';
import { AuthService } from './protected/services/auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { AppState } from './app.reducer';
import { OrderService } from './protected/services/order/order.service';
import { Store } from '@ngrx/store';
import * as articleActions from './article.actions';
import { LocalStorageService } from './protected/services/localStorage/local-storage.service';
import { getDataLS, getDataSS, saveDataLS } from './protected/Storage';
import { CookieService } from 'ngx-cookie-service';
import { filter, tap } from 'rxjs';
import { User } from './protected/models/user.models';
import { ErrorService } from './protected/services/error/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'practigestion-app';
  @Output () currentUrl : any = '';
  @Output () login : boolean = false;
   isLoading : boolean = false;
   user : any;

  @HostListener('window:beforeunload')
  doSomething() {

    // let userUpdate = this.authService.user;
    // let userToLS = {nombre: userUpdate.nombre, permisos: userUpdate.permisos}

    // if(userToLS !== undefined && userToLS !== null){
    //   this.localStorageService.saveStateToLocalStorage(userToLS, 'user');
    // }
    // else{
    //   // este usuario sale de redux
    //   this.localStorageService.saveStateToLocalStorage(this.user, 'user');
    //   this.isLoading = true;

    // }

  }
  
  

  constructor(
              private localStorageService: LocalStorageService,
              public router : Router,
              private store : Store <AppState>,
              private orderService : OrderService,
              private cookieService : CookieService,
              private authService : AuthService,
              private errorService : ErrorService

  ){
    

    // si se borra el user del LS pero tengo la cookie que llame al user del back
    const token = this.cookieService.get('token');
    const userLS = getDataLS('user');
    if(token !== '' && userLS === undefined){
      this.authService.getUser().subscribe();

    }


  }

  ngOnInit(): void {

   this.localStorageService.loadInitialState();
   
   this.isLoading = true;
   this.errorService.closeIsLoading$.subscribe((emmited)=>{if(emmited){this.isLoading = false}})
  
    this.store.select('auth')
    .pipe(
      // tap(()=>this.isLoading = true),
      filter( ({user})=>  user != null && user != undefined),
    ).subscribe(
      ({user})=>{
        this.user = { nombre:user?.nombre, permisos:user?.permisos} ;
        this.isLoading = false;
      })
  

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
   
      }
    });


  }




}
