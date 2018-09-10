import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HouseComponent } from './house.component';
import { TenantComponent } from './tenant.component';
//import { PageNotFoundComponent } from './pagenotfound.component'

const appRoutes: Routes = [
  // todo default page: home?
  //{ path: '', component: AppComponent},
    { path: 'house', component: HouseComponent },
    { path: 'tenant', component: TenantComponent },
  // todo wrong url
  //{ path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports:      [
      RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
      )
    ],
    exports: [
        RouterModule
    ]
    
  })
  export class AppRoutingModule { }
