import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './protected/pages/login/login/login.component';
import { ClientComponent } from './protected/pages/client/client/client.component';
import { DashboardComponent } from './protected/pages/dashboard/dashboard.component';
import { OrderComponent } from './protected/pages/order/order/order.component';
import { ArticlesComponent } from './protected/pages/articles/articles/articles.component';
import { ViewMoreArticleComponent } from './protected/pages/view-more-article/view-more-article/view-more-article.component';
import { WrongActionMessageComponent } from './protected/messages/wrong-action-message/wrong-action-message/wrong-action-message.component';
import { GenericSuccessComponent } from './protected/messages/generic-success/generic-success/generic-success.component';
import { PickClientMessageComponent } from './protected/messages/pick-client-message/pick-client-message/pick-client-message.component';
import { SelectArticleMessageComponent } from './protected/messages/select-article-message/select-article-message/select-article-message.component';
import { SearchProductsComponent } from './protected/pages/searchProducts/search-products/search-products.component';
import { TempOrderComponent } from './protected/pages/temp-order/temp-order/temp-order.component';
import { EditClientComponent } from './protected/pages/edit-client/edit-client/edit-client.component';
import { NewClientComponent } from './protected/pages/new-client/new-client/new-client.component';
import { EditArticleComponent } from './protected/pages/edit-article/edit-article/edit-article.component';
import { ListPriceHomeComponent } from './protected/pages/list-price-home/list-price-home/list-price-home.component';
import { GeneralListComponent } from './protected/pages/general-list/general-list/general-list.component';
import { LoginMessageComponent } from './protected/messages/login-message/login-message/login-message.component';
import { ListByIdComponent } from './protected/pages/list-by-id/list-by-id/list-by-id.component';
import { AskTempOrderComponent } from './protected/messages/ask-temp-order/ask-temp-order/ask-temp-order.component';
import { FooterComponent } from './protected/pages/footer/footer/footer.component';
import { AskDelClientComponent } from './protected/messages/ask-del-client/ask-del-client/ask-del-client.component';
import { ListOrdersComponent } from './protected/pages/list-orders/list-orders/list-orders.component';
import { ErrorBackendDownComponent } from './protected/messages/error-backend-down/error-backend-down/error-backend-down.component';
import { HeaderComponent } from './protected/pages/header/header/header.component';
import { EditOrderComponent } from './protected/messages/edit-order/edit-order/edit-order.component';
import { GenericMessageComponent } from './protected/messages/generic-message/generic-message/generic-message.component';
import { MantainMessageComponent } from './protected/messages/maintain-message/mantain-message/mantain-message.component';
import { NoPermissionMessageComponent } from './protected/messages/no-permission-message/no-permission-message/no-permission-message.component';


// services
import { InterceptorService } from './protected/services/interceptor/interceptor.service';
import { LocalStorageService } from './protected/services/localStorage/local-storage.service';


//ngrx
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effect';

// pipes
import { CapitalizeFirstLetterPipe } from './protected/pipes/CapitalizeFirstLetterPipe';
import { ProductStatusPipe } from './protected/pipes/productStatus.pipe';
import { PriceRound } from './protected/pipes/priceRound';
import { GetTotalItems } from './protected/pipes/getTotalItems.pipe';
import { TwoDecimalPipe } from './protected/pipes/twoDecimal.pipe';

//idioma de la app
import localeEs from '@angular/common/locales/es-AR'; //nombre inventado el AR es por Argentina
import { registerLocaleData } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AddItemComponent } from './protected/add-item/add-item/add-item.component';
import { AskOpenOrderComponent } from './protected/messages/ask-open-order/ask-open-order/ask-open-order.component';
import { AskSendOrderComponent } from './protected/messages/ask-send-order/ask-send-order/ask-send-order.component';
import { SettingsComponent } from './pages/settings/settings/settings.component';

registerLocaleData( localeEs );



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    OrderComponent,
    ClientComponent,
    LoginComponent,
    ArticlesComponent,
    PickClientMessageComponent,
    CapitalizeFirstLetterPipe,
    SelectArticleMessageComponent,
    ProductStatusPipe,
    WrongActionMessageComponent,
    GenericSuccessComponent,
    SearchProductsComponent,
    TempOrderComponent,
    EditClientComponent,
    NewClientComponent,
    EditArticleComponent,
    ListPriceHomeComponent,
    GeneralListComponent,
    LoginMessageComponent,
    ListByIdComponent,
    AskTempOrderComponent,
    FooterComponent,
    AskDelClientComponent,
    ListOrdersComponent,
    PriceRound,
    GetTotalItems,
    TwoDecimalPipe,
    ErrorBackendDownComponent,
    HeaderComponent,
    EditOrderComponent,
    GenericMessageComponent,
    MantainMessageComponent,
    NoPermissionMessageComponent,
    AddItemComponent,
    AskOpenOrderComponent,
    AskSendOrderComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducers),
    environment.imports,
    EffectsModule.forRoot([AuthEffects]),

    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: environment.production,
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000'
      }),
  
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
  
      },
      LocalStorageService,
    { provide: LOCALE_ID, useValue: 'es-AR' }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
