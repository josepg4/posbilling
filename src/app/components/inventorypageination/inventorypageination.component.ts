import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

import { Item } from '../../models/Item';

@Component({
  selector: 'app-inventorypageination',
  templateUrl: './inventorypageination.component.html',
  styleUrls: ['./inventorypageination.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class InventorypageinationComponent implements OnInit {

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
