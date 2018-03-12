import { Component, OnInit } from '@angular/core';
import {
  InventorydataService
} from '../../services/inventorydata.service';

import { Bill, BillingItem } from '../../models/bill';

@Component({
  selector: 'app-billhistory',
  templateUrl: './billhistory.component.html',
  styleUrls: ['./billhistory.component.css']
})
export class BillhistoryComponent implements OnInit {

  dateFrom : Date ;
  dateTo : Date ;
  bills : Bill[] = [];

  constructor(private _inventorydataService: InventorydataService) { }

  ngOnInit() {
    this.dateFrom = new Date();
    this.dateTo = new Date();
    this._inventorydataService.getBill(this.dateToQueryObject(this.dateFrom, this.dateTo)).subscribe(result => {
      this.bills = result;
    })
  }

  onShowBillItem(bill : Bill) : void {
    this._inventorydataService.getBillItems(bill.billid).subscribe(result => {
      this.bills.some((cur, index) => {
        if(cur.billid == bill.billid){
          this.bills[index].items = result;
          return true;
        }
        else false;
      })
    })
  }

  onHideBillItem(bill : Bill) : void {
    this.bills.some((cur, index) => {
      if(cur.billid == bill.billid){
        this.bills[index].items = [];
        return true;
      }
      else false;
    })
  }

  getBills(){
    this._inventorydataService.getBill(this.dateToQueryObject(this.dateFrom, this.dateTo)).subscribe(result => {
      this.bills = result;
    })
  }

  dateToQueryObject(dateFrom: Date, dateTo: Date): any {
    dateFrom.setHours(0, 0, 0, 0);
    dateTo.setDate(dateTo.getDate() + 1);
    dateTo.setHours(0, 0, 0, 0);
    return {
      dateFrom: dateFrom.toISOString().substr(0, 10) + ' ' + dateFrom.toISOString().substr(11, 8),
      dateTo: dateTo.toISOString().substr(0, 10) + ' ' + dateTo.toISOString().substr(11, 8)
    }
  }

}
