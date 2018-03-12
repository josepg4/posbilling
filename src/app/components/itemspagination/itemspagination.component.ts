import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

import { Item } from '../../models/Item';

@Component({
  selector: 'app-itemspagination',
  templateUrl: './itemspagination.component.html',
  styleUrls: ['./itemspagination.component.css']
})
export class ItemspaginationComponent implements OnInit {

  @Output() updateItem : EventEmitter<Item> = new EventEmitter();
  @Output() removeItem : EventEmitter<Item> = new EventEmitter();

  @Input('data') inventory: Item[];

  public config: PaginationInstance = {
    id: 'itempagination',
    itemsPerPage: 7,
    currentPage: 1
  };

  constructor() { }

  ngOnInit() {
  }

  onEditItem(item : Item) {
    this.updateItem.emit(item);
  }

  onRemoveItem(item: Item) {
    this.removeItem.emit(item);
  }

}
