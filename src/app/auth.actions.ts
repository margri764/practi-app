import { createAction, props } from "@ngrx/store";

/************************** SET *******************************/
export const setUser = createAction( '[Auth] setUser',
    props<{ user: any }>()
);

export const setTempClient = createAction( '[Auth] setTempClient',
    props<{ client: any }>()
);



/************************** UNSET *******************************/
export const unSetUser = createAction('[Auth] unSetUser');
export const unSetTempClient = createAction('[Auth] unSetTempClient');