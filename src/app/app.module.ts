import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxElectronModule } from 'ngx-electron';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgDatepickerModule } from 'ng2-datepicker';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { InventorydataService } from './services/inventorydata.service';
import { StaticdataholdingService } from './services/staticdataholding.service';
import { InventorypaginationComponent } from './components/inventorypagination/inventorypagination.component';
import { OnloadComponent } from './components/onload/onload.component';
import { ItemsComponent } from './components/items/items.component';
import { ItemspaginationComponent } from './components/itemspagination/itemspagination.component';
import { BillingComponent } from './components/billing/billing.component';
import { BillhistoryComponent } from './components/billhistory/billhistory.component';
import { BillhistorypaginationComponent } from './components/billhistorypagination/billhistorypagination.component';
import { DeterminePipe } from './pipes/determine.pipe';
import { OfferPipe } from './pipes/offer.pipe';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { PurchasehistoryComponent } from './components/purchasehistory/purchasehistory.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UsersettingsComponent } from './components/usersettings/usersettings.component';
import { CategorysettingsComponent } from './components/categorysettings/categorysettings.component';
import { TaxsettingsComponent } from './components/taxsettings/taxsettings.component';
import { OffersettingsComponent } from './components/offersettings/offersettings.component';
import { PuchasehistorypaginationComponent } from './components/puchasehistorypagination/puchasehistorypagination.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    InventoryComponent,
    InventorypaginationComponent,
    OnloadComponent,
    ItemsComponent,
    ItemspaginationComponent,
    BillingComponent,
    BillhistoryComponent,
    BillhistorypaginationComponent,
    DeterminePipe,
    OfferPipe,
    PurchaseComponent,
    PurchasehistoryComponent,
    SettingsComponent,
    UsersettingsComponent,
    CategorysettingsComponent,
    TaxsettingsComponent,
    OffersettingsComponent,
    PuchasehistorypaginationComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    NgxElectronModule,
    NgxPaginationModule,
    NgSelectModule,
    FormsModule,
    NgDatepickerModule
  ],
  providers: [
    InventorydataService,
    StaticdataholdingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
