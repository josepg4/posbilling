import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

import { Item } from '../../models/Item';

@Component({
  selector: 'app-inventorypagination',
  templateUrl: './inventorypagination.component.html',
  styleUrls: ['./inventorypagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventorypaginationComponent implements OnInit {

  @Input('data') inventory: Item[];

  public config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 25,
    currentPage: 1
};

  constructor() { }

  ngOnInit() {
  }

}
