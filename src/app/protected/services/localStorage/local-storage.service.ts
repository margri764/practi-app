import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as articleAction from 'src/app/article.actions'
import * as authAction from 'src/app/auth.actions'
import { getDataLS, getDataSS, saveDataLS, saveDataSS } from '../../Storage';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  constructor(
              private store: Store<AppState>,
              ) {
  }

   loadInitialState() {
    const storedState = getDataSS("arrArticles");
    const openOrders = getDataSS("openOrders");
    const user = getDataLS("user");
    const tempUser = getDataSS("tempClient");
    //  console.log(openOrders);
    // console.log(storedState);

    if (storedState !== undefined && storedState !== null) {
      this.store.dispatch(articleAction.setSelectedArticles({ arrSelectedArticles: storedState }));
    }
    if(openOrders !== undefined && openOrders !== null){
      this.store.dispatch(articleAction.setTempOrder({ tempOrder: openOrders }));
    }
    if(user !== undefined && user !== null){
      this.store.dispatch(authAction.setUser({ user }));
    }

    if(tempUser !== undefined && tempUser !== null){
      this.store.dispatch(authAction.setTempClient({ client: tempUser }));
    }
 
  }

  saveStateToLocalStorage(dataToSave: any, keyLStorage : string) {
    saveDataLS(keyLStorage, dataToSave);
  }

  saveStateToSessionStorage(dataToSave: any, keyLStorage : string) {
    saveDataSS(keyLStorage, dataToSave);
  }


}