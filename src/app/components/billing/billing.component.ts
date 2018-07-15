import {
  Component,
  OnInit
} from '@angular/core';
import {
  InventorydataService
} from '../../services/inventorydata.service';
import { StaticdataholdingService } from '../../services/staticdataholding.service';

import {
  Item
} from '../../models/Item';
import {
  Bill,
  BillingItem
} from '../../models/Bill';
import {
  Tax
} from '../../models/Tax';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  inventory: Item[] = [];
  selectedItem: Item;
  billItem: BillingItem;
  taxes : Tax[] = [];
  message : string = "";
  showError: boolean = false;
  isBillSaved : boolean = false;
  onDC : boolean = false;

  bill: Bill = {
    billid: null,
    tax: 0,
    offvalue: 0,
    total: 0,
    items: []
  }

  constructor(private _inventorydataService: InventorydataService, private _staticdataService: StaticdataholdingService) {
  }

  ngOnInit() {
    this.billItem = this.getEmptyBillItem();
    this._inventorydataService.getInventory().subscribe(items => {
      this.inventory = items;
    })
    this.taxes = this._staticdataService.getTaxes()
    this._inventorydataService.getstoredId().subscribe(itemid => {
        this.bill.billid = 'B' + (itemid.billid + 1).toString();
    });
  }

  onClearBill() : void {
    this.onDC = true;
    this._inventorydataService.getstoredId().subscribe(itemid => {
      this.bill.billid = 'B' + (itemid.billid + 1).toString();
      this.bill.tax = 0;
      this.bill.offvalue = 0;
      this.bill.total = 0;
      this.bill.items = [];
      this.onDC = false;
      this.isBillSaved = false;
  });
  }

  onNewBillItem() : void {

    let isStockAvailable : boolean = false;
    let remainingStock : number = 0;

    this.inventory.some((cur, index) => {
      if(cur.prodid === this.billItem.prodid){
        if(cur.stock < this.billItem.quantity){
          remainingStock = cur.stock;
          return true;
        }else{
          this.inventory[index].stock-=this.billItem.quantity;
          isStockAvailable = true;
          return true;
        }
      }
      return isStockAvailable;
    })

    if(!isStockAvailable){
      this.message = "Sorry, Only " + remainingStock.toString() + " units are remainig for " + this.billItem.prodname ;
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 5000);
      return;
    }

    let isAvailable : boolean = false;
    let newBillItem : BillingItem = this.getEmptyBillItem();
    let unitprice : number = this.getUnitPrice(this.billItem);
    newBillItem.prodid = this.billItem.prodid;
    newBillItem.prodname = this.billItem.prodname;
    newBillItem.quantity = this.billItem.quantity;
    newBillItem.unitprice = unitprice;
    newBillItem.tax = this.billItem.tax;
    newBillItem.offvalue = this.billItem.offvalue;
    this.bill.items.some((cur, index) => {
      if(newBillItem.prodid === cur.prodid){
        isAvailable = true;
        this.bill.items[index].quantity+=newBillItem.quantity;
      }
      return isAvailable;
    })
    if(!isAvailable){
      this.bill.items.unshift(newBillItem);
    }
    this.bill.offvalue+=newBillItem.offvalue*newBillItem.quantity;
    this.bill.tax+=(newBillItem.unitprice*newBillItem.tax*newBillItem.quantity/100);
    this.bill.total+=((newBillItem.unitprice*newBillItem.quantity)+(newBillItem.unitprice*newBillItem.tax*newBillItem.quantity/100))
    this.selectedItem = null;
    this.billItem = this.getEmptyBillItem();
  }

  onBillItemRemove(item : BillingItem) {
    this.bill.items.forEach((cur, index) => {
      if (item.prodid === cur.prodid) {
        this.bill.items.splice(index, 1);
      }
    });
    
    this.inventory.some((cur, index) => {
      if(item.prodid === cur.prodid){
        this.inventory[index].stock+=item.quantity;  
        return true;
      }else{
        return false;
      }
    })
    this.bill.offvalue-=item.offvalue*item.quantity;
    this.bill.tax-=(item.unitprice*item.tax*item.quantity/100);
    this.bill.total-=((item.unitprice*item.quantity)+(item.unitprice*item.tax*item.quantity/100))
  }

  getUnitPrice(item : BillingItem) : number {
    return 100*(item.unitprice - item.offvalue)/(100 + item.tax);
  }

  itemSelected(item: Item) {
    if (item) {
      this.billItem.prodid = item.prodid;
      this.billItem.prodname = item.prodname;
      this.billItem.quantity = 1;
      this.billItem.unitprice = item.unitprice;
      this.billItem.tax = this.getTaxValueFromId(item.tax);
      this.billItem.offvalue = this.getOffValue(item);
    } else {
      this.billItem = this.getEmptyBillItem();
    }
  }

  getEmptyBillItem(): BillingItem {
    return {
      prodid: null,
      prodname: null,
      quantity: null,
      unitprice: null,
      tax: null,
      offvalue: null
    }
  }

  getOffValue(item : Item) : number {
    return item.hasoff ? (item.offtype === 'rupee' ? item.offvalue : (item.offvalue * item.unitprice / 100)) : 0;
  }

  getTaxValueFromId(id : number ): number{
    let taxvalue : number = 0; 
    this.taxes.forEach(tax  => {
      if(tax.taxid === id){
        taxvalue = tax.taxvalue;
      }
    })
    return taxvalue;
  }

  onNewBill() {
    this.onDC = true;
    this.selectedItem = null;
    this.billItem = this.getEmptyBillItem();
    this._inventorydataService.newBill(this.bill).subscribe(result => {
      if(result.length == this.bill.items.length){
        this.isBillSaved = true;
        this.onDC = false;
      }
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
