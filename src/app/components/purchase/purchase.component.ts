import { Component, OnInit } from '@angular/core';
import { InventorydataService } from '../../services/inventorydata.service';
import { StaticdataholdingService } from '../../services/staticdataholding.service';

import { Item } from '../../models/Item';
import { Tax } from '../../models/Tax';
import { Purchase, PurchaseItem } from '../../models/Purchase';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  inventory: Item[] = [];
  selectedItem: Item;
  taxes : Tax[] = [];
  message : string = "";
  showError: boolean = false;
  onDC : boolean = false;

  isPurchaseSaved : boolean = false;

  purchaseItem : PurchaseItem;

  purchase : Purchase = {
    purchaseid : null,
    discount  : 0,
    total     : 0,
    items : []
  }

  constructor(private _inventorydataService: InventorydataService, private _staticdataService: StaticdataholdingService) {
  }

  ngOnInit() {
    this.purchaseItem = this.getEmptyPurchaseItem();
    this._inventorydataService.getInventory().subscribe(items => {
      this.inventory = items;
    })
    this.taxes = this._staticdataService.getTaxes()
    this._inventorydataService.getstoredId().subscribe(itemid => {
        this.purchase.purchaseid = 'PU' + (itemid.purchaseid + 1).toString();
    });
  }

  getEmptyPurchaseItem(): PurchaseItem {
    return {
      prodid    : null,
      prodname  : null,
      quantity  : null,
      unitprice : null,
      tax       : null,
      total     : null,
      offtype   : '',
      hasoff    : null,
      discount  : null
    }
  }

  itemSelected(item: Item) {
    if (item) {
      this.purchaseItem.prodid = item.prodid;
      this.purchaseItem.prodname = item.prodname;
      this.purchaseItem.quantity = 1;
      this.purchaseItem.unitprice = 0;
      this.purchaseItem.total = 0;
      this.purchaseItem.tax = item.tax;
      this.purchaseItem.hasoff = item.hasoff;
      this.purchaseItem.offtype = item.offtype;
      this.purchaseItem.discount = item.offvalue;
      this.purchaseItem.sellingprice = item.unitprice;
    } else {
      this.purchaseItem = this.getEmptyPurchaseItem(); 
    }
  }

  onQuantityChange() : void {
    if(!this.purchaseItem.quantity){
      this.purchaseItem.quantity = 0;
    }
    this.purchaseItem.total = this.purchaseItem.quantity*this.purchaseItem.unitprice;
  }

  onClearPurchase() : void {
      this.onDC = true;
      this._inventorydataService.getstoredId().subscribe(itemid => {
        this.purchase.purchaseid = 'PU' + (itemid.purchaseid + 1).toString();
        this.purchase.discount = 0;
        this.purchase.total = 0;
        this.purchase.items = [];
        this.onDC = false;
        this.isPurchaseSaved = false;
    });
  }

  onNewPurchaseItem() : void {

    this.purchase.items.unshift(this.purchaseItem);

    this.purchase.total+=this.purchaseItem.total;

    this.purchaseItem = null;
    this.purchaseItem = this.getEmptyPurchaseItem();
    this.selectedItem = null;
  }

  onPurchaseItemRemove(item : PurchaseItem) : void {
    this.purchase.items.forEach((cur, index) => {
      if (item.prodid === cur.prodid) {
        this.purchase.items.splice(index, 1);
      }
    });
    this.purchase.total-=item.total;
  }

  onNewPurchase() : void {
    this.onDC = true;
    this.selectedItem = null;
    this.purchaseItem = this.getEmptyPurchaseItem();
    this._inventorydataService.newPurchase(this.purchase).subscribe(result => {
      if(result.length == this.purchase.items.length){
        this.isPurchaseSaved = true;
        this.onDC = false;
      }
    })
  }

}
