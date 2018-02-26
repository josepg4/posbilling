import { Component, OnInit } from '@angular/core';
import { InventorydataService } from '../../services/inventorydata.service';

import { Item } from '../../models/Item';
import { Input } from '@angular/core/src/metadata/directives';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  p: number = 1;
  inventory : Item[] = [];
  inventorySorted : Item[] = [];
  toggle : boolean = true;
  selectedItem : Item;
  selectedCategory : Item[];
  filterClicked : number = 0;

  constructor(private _inventorydataService: InventorydataService) { }

  ngOnInit() {
    this._inventorydataService.getInventory().subscribe(items => {
      this.inventory = items;
      this.inventorySorted = items;
      console.log("this happens")
    })
  }

  showAll = () => {
    this.filterClicked = 0;
    this.inventorySorted = this.inventory;
  }
  
  returnOne = () => {
    if(this.selectedItem){
    }else{
      switch(this.filterClicked){
        case 0 :
          this.showAll();
          break;
        case 1 :
          this.filterLowStock();
          break;
        case 2 :
          this.filterEmptyStock();
          break;
        case 3 :
          this.filterWithOffer();
          break;
      }
    }
  };

  returnTwo = () => {
    if(this.selectedItem){
      console.log("clicked")
      this.inventorySorted = [];
      this.inventorySorted.push(this.selectedItem);
    }
  };

  returnThree = () => {
    console.log(this.selectedCategory);
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
