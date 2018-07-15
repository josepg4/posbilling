import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OnloadComponent } from './components/onload/onload.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ItemsComponent } from './components/items/items.component';
import { BillingComponent } from './components/billing/billing.component';
import { BillhistoryComponent } from './components/billhistory/billhistory.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { PurchasehistoryComponent } from './components/purchasehistory/purchasehistory.component';
import { SettingsComponent } from './components/settings/settings.component'


const routes: Routes = [
  {path: '', component: OnloadComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'inventory', component: InventoryComponent},
  {path: 'items', component: ItemsComponent},
  {path: 'newbill', component: BillingComponent},
  {path: 'billhistory', component: BillhistoryComponent},
  {path: 'newpurchase', component: PurchaseComponent},
  {path: 'purchasehistory', component: PurchasehistoryComponent},
  {path: 'settings', component: SettingsComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
