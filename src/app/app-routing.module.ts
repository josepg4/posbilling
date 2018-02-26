import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OnloadComponent } from './components/onload/onload.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ItemsComponent } from './components/items/items.component';

const routes: Routes = [
  {path: '', component: OnloadComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'inventory', component: InventoryComponent},
  {path: 'items', component: ItemsComponent},
  
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
