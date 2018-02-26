import { Component, OnInit } from '@angular/core';
import { InventorydataService } from "../../services/inventorydata.service"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  inventory : any[];

  constructor(private _inventorydataService : InventorydataService) { }

  ngOnInit() {
    this._inventorydataService.getInventory().subscribe(inventory => {
      this.inventory = inventory;
    });
  }

}
