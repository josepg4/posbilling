import { Component, OnInit } from '@angular/core';
import { InventorydataService } from '../../services/inventorydata.service';

import { Item } from '../../models/Item';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  inventory : Item[] = [];

  selectedItem : Item;

  constructor(private _inventorydataService: InventorydataService) { }

  ngOnInit() {
    this._inventorydataService.getInventory().subscribe(items => {
      this.inventory = items;
    });
  }

}
