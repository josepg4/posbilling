import { Component, OnInit } from '@angular/core';
import {  InventorydataService } from '../../services/inventorydata.service';

import { Purchase, PurchaseItem } from '../../models/Purchase';

@Component({
  selector: 'app-purchasehistory',
  templateUrl: './purchasehistory.component.html',
  styleUrls: ['./purchasehistory.component.css']
})
export class PurchasehistoryComponent implements OnInit {

  dateFrom : Date ;
  dateTo : Date ;
  purchases : Purchase[] = [];

  constructor(private _inventorydataService: InventorydataService) {
  }

  ngOnInit() {
    this.dateFrom = new Date();
    this.dateTo = new Date();
    this.getPurchases();
  }

  getPurchases(){
    this._inventorydataService.getPurchase(this.dateToQueryObject(this.dateFrom, this.dateTo)).subscribe(result => {
      this.purchases = result;
      console.log(result)
    })
  }

  onShowPurchaseItem(purchase : Purchase) : void {
    this._inventorydataService.getPurchaseItems(purchase.purchaseid).subscribe(result => {
      this.purchases.some((cur, index) => {
        if(cur.purchaseid == purchase.purchaseid){
          this.purchases[index].items = result;
          return true;
        }
        else false;
      })
    })
  }

  onHidePurchaseItem(purchase : Purchase) : void {
    this.purchases.some((cur, index) => {
      if(cur.purchaseid == purchase.purchaseid){
        this.purchases[index].items = [];
        return true;
      }
      else false;
    })
  }

  dateToQueryObject(dateFrom: Date, dateTo: Date): any {
    let dataToEnd = new Date(dateTo);
    dateFrom.setHours(0, 0, 0, 0);
    dataToEnd.setDate(dataToEnd.getDate() + 1);
    dataToEnd.setHours(0, 0, 0, 0);
    return {
      dateFrom: dateFrom.toISOString().substr(0, 10) + ' ' + dateFrom.toISOString().substr(11, 8),
      dateTo: dataToEnd.toISOString().substr(0, 10) + ' ' + dataToEnd.toISOString().substr(11, 8)
    }
  }

}
