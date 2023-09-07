import { ActionReducerMap } from '@ngrx/store';
import * as auth from './auth.reducer';
import * as article from './article.reducer';


export interface AppState  {
   auth: auth.Auth,
   article : article.Article
//    product : product.Product
}



export const appReducers: ActionReducerMap<AppState> = {
   auth: auth.authReducer,
   article: article.articleReducer,
//    order: order.orderReducer,
//    product: product.productReducer

}
