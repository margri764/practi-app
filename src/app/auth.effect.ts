import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import * as authActions from 'src/app/auth.actions'

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private store: Store<AppState>
      ) {}

//   updateFormOnTempClientChange$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(authActions.setTempClient),
//       map(action => action.client),
//     )
//   );


}