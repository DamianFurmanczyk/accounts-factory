import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { HomepageResolver } from './core/resolvers/homepage.resolver';
import { CheckoutResolver } from './core/resolvers/checkout.resolver';
import { BulkResolver } from './core/resolvers/bulk.resolver';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        resolve: {HomepageResolver},
        loadChildren: () => import('./modules/homepage/homepage.module').then(m => m.HomepageModule)
      },
      {
        path: 'bulk',
        resolve: {BulkResolver},
        loadChildren: () => import('./modules/bulk/bulk.module').then(m => m.BulkModule)
      },
      {
        path: 'checkout',
        resolve: {CheckoutResolver},
        loadChildren: () => import('./modules/checkout/checkout.module').then(m => m.CheckoutModule)
      },
      {
        path: '**', redirectTo: ''
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

