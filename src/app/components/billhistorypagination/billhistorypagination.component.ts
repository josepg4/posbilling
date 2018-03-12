import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

import { Bill, BillingItem } from '../../models/bill';

@Component({
  selector: 'app-billhistorypagination',
  templateUrl: './billhistorypagination.component.html',
  styleUrls: ['./billhistorypagination.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class BillhistorypaginationComponent implements OnInit {

  @Input('data') bills: Bill[];
  @Output() showBillItem : EventEmitter<Bill> = new EventEmitter();
  @Output() hideBillItem : EventEmitter<Bill> = new EventEmitter();

  public config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: 1
};

  constructor() { }

  ngOnInit() {
  }

  onShowBillItem(bill : Bill) : void {
    this.showBillItem.emit(bill);
  }

  onHideBillItem(bill : Bill) : void {
    this.hideBillItem.emit(bill);
  }

}
