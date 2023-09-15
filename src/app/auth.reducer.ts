import { Action, createReducer, on } from '@ngrx/store';
import { setSalePoint, setTempClient, setUser, unSetSalePoint, unSetTempClient, unSetUser } from './auth.actions';
import { User } from './protected/models/user.models';


export interface Auth {
    user: User | null; 
    tempClient: any | null; 
    salePoint : any
    // staff: Staff | null; 
    // verifyAccount : boolean,
    // path : string,
    // banner : boolean,
    // userRegister: any | null,
    // body : any,
    // id : string | null,
    // address : string | null,
    // delivery : string | null,
    // favorite : boolean;
    // arrItems: [] | null,
    // isLoading: boolean,
    // appState : any


    // el body tendria q ser de tipo user o register no se

}

export const initialState: Auth = {
     user: null,
     tempClient: null,
     salePoint: null
    //  staff: null,
    //  verifyAccount: false,
    //  banner : true,
    //  path : '',
    //  body: null,
    //  userRegister: null,
    //  id: null,
    //  address : null,
    //  delivery : null,
    //  favorite : false,
    //  arrItems : null,
    //  isLoading: false,
    //  appState : true

}

const _authReducer = createReducer(initialState,

    on( setUser, (state, { user }) => ({ ...state, user: { ...user }  })),
    on( unSetUser, state => ({ ...state, user: null  })),

    on( setTempClient, (state, { client }) => ({ ...state, tempClient: { ...client }  })),
    on( unSetTempClient, state => ({ ...state, tempClient: null  })),

    on( setSalePoint, (state, { salePoint }) => ({ ...state, salePoint:  salePoint   })),
    on( unSetSalePoint, state => ({ ...state, salePoint: null  })),

    
);

export function authReducer(state: Auth | undefined, action: Action) {
    return _authReducer(state, action);
}