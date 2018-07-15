import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

import { Purchase, PurchaseItem } from '../../models/Purchase';

@Component({
  selector: 'app-puchasehistorypagination',
  templateUrl: './puchasehistorypagination.component.html',
  styleUrls: ['./puchasehistorypagination.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PuchasehistorypaginationComponent implements OnInit {

  @Input('data') purchases: Purchase[];
  @Output() showPurchaseItem : EventEmitter<Purchase> = new EventEmitter();
  @Output() hidePurchaseItem : EventEmitter<Purchase> = new EventEmitter();

  public config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: 1
};

  constructor() { }

  ngOnInit() {
  }

  onShowPurchaseItem(purchase : Purchase) : void {
    this.showPurchaseItem.emit(purchase);
  }

  onHidePurchaseItem(purchase : Purchase) : void {
    this.hidePurchaseItem.emit(purchase);
  }

}
