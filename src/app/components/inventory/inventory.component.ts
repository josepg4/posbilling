import { Component, OnInit } from '@angular/core';
import { InventorydataService } from '../../services/inventorydata.service';
import { StaticdataholdingService } from '../../services/staticdataholding.service';

import { Item } from '../../models/Item';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  inventory : Item[] = [];
  inventorySorted : Item[] = [];
  toggle : boolean = true;
  selectedItem : Item;
  selectedCategory : Item[];
  filterClicked : number = 0;
  categories : any[];

  constructor(private _inventorydataService: InventorydataService, private _staticdataService: StaticdataholdingService) { }

  ngOnInit() {
    this._inventorydataService.getInventory().subscribe(items => {
      this.inventory = items;
      this.inventorySorted = items;
    });
    this.categories = this._staticdataService.getCategory()
  }
    
  fireevent (){
        this.inventory.unshift({
          id        : 1000,
          prodid    : "string",
          prodname  : "string fdasd afasdf dsfasd",
          proddisc  : "string",
          isremoved : true,
          stock     : 0,
          unitprice : 0,
          category  : 0,
          tax       : 0,
          hasoff    : 0,
          offtype   : "string",
          offvalue  : 0,
          updated_by: "string",
          created_at: new Date(),
          updated_at: new Date()
      });
    }

  showAll = () => {
    this.filterClicked = 0;
    this.inventorySorted = this.inventory;
  }
  
  onItemSelected = () => {
    if(this.selectedItem){
      this.filterClicked = undefined;
      this.inventorySorted = [];
      this.inventorySorted.push(this.selectedItem);
    }else{
      this.filterClicked = 0;
      this.showAll();
    }
  };

  filterLowStock = () => {
    this.filterClicked = 1;
    this.selectedItem = undefined;
    this.selectedCategory = [];
    this.inventorySorted = this.inventory.filter(item => item.stock < 6 && item.stock > 0);
  }

  filterEmptyStock = () => {
    this.filterClicked = 2;
    this.selectedItem = undefined;  
    this.selectedCategory = [];
    this.inventorySorted = this.inventory.filter(item => item.stock == 0);
  }

  filterWithOffer = () => {
    this.filterClicked = 3;
    this.selectedItem = undefined;  
    this.selectedCategory = [];
    this.inventorySorted = this.inventory.filter(item => item.hasoff);
  }


  
}
