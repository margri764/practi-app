import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './protected/pages/dashboard/dashboard.component';
import { OrderComponent } from './protected/pages/order/order/order.component';
import { ClientComponent } from './protected/pages/client/client/client.component';
import { ArticlesComponent } from './protected/pages/articles/articles/articles.component';
import { LoginComponent } from './protected/pages/login/login/login.component';
import { ViewMoreArticleComponent } from './protected/pages/view-more-article/view-more-article/view-more-article.component';
import { SearchProductsComponent } from './protected/pages/searchProducts/search-products/search-products.component';
import { TempOrderComponent } from './protected/pages/temp-order/temp-order/temp-order.component';
import { ListPriceHomeComponent } from './protected/pages/list-price-home/list-price-home/list-price-home.component';
import { GeneralListComponent } from './protected/pages/general-list/general-list/general-list.component';
import { ListOrdersComponent } from './protected/pages/list-orders/list-orders/list-orders.component';
import { ListByIdComponent } from './protected/pages/list-by-id/list-by-id/list-by-id.component';
import { RoleGuard } from './protected/guards/role.guard';
import { SettingsComponent } from './pages/settings/settings/settings.component';


const routes: Routes = [
  
  {
    path: 'armar-pedido',  component: OrderComponent,
    canActivate: [RoleGuard ],
    canLoad: [ RoleGuard],
  },
  {
    path: 'listado-clientes',  component: ClientComponent,
    canActivate: [RoleGuard ],
    canLoad: [ RoleGuard],
  },

  {
    path: 'listado-precios/listado/:id',  component: ListByIdComponent
  },
  {
    path: 'listado-precios',  component : GeneralListComponent,
    canActivate: [RoleGuard ],
    canLoad: [ RoleGuard],
  },

  {
    path: 'listado-articulos',  component: ArticlesComponent,
    canActivate: [RoleGuard ],
    canLoad: [ RoleGuard],
  },
  {
    path: 'listado-pedidos',  component: ListOrdersComponent,
    canActivate: [RoleGuard ],
    canLoad: [ RoleGuard],
  },
  {
    path: 'pedidos-temporales',  component: TempOrderComponent,
    canActivate: [RoleGuard ],
    canLoad: [ RoleGuard],
  },
  {
    path: 'buscar-articulos',  component: SearchProductsComponent,
    canActivate: [RoleGuard ],
    canLoad: [ RoleGuard],
  },
  {
    path: 'articulo/:id',  component: ViewMoreArticleComponent
  },

  {
    path: 'configuraciones',  component: SettingsComponent
  },
  {
    path: 'clientes',  component: ClientComponent,
    canActivate: [RoleGuard ],
    canLoad: [ RoleGuard],
  },
  {
    path: 'login',  component: LoginComponent
  },
  {
    path: 'home',  component: DashboardComponent
  },
 
  {
    path: "", redirectTo: "login", pathMatch: 'full'
  },
  {
    path: '**',    redirectTo: 'login'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
