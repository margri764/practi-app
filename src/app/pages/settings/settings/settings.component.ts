import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  userSubscription!:Subscription;
  user: any | undefined;
  isLoading : boolean = false;


  constructor(
               private store : Store <AppState>,

  ) { }

  ngOnInit(): void {

    this.isLoading = true;

    this.userSubscription = this.store.select('auth')
    .pipe(
      filter( ({user})=>  user != null && user != undefined),
    ).subscribe(
      ({user})=>{
        this.user = user;
        this.isLoading = false;
      })
  
    
  }

}
