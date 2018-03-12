import { Pipe, PipeTransform } from '@angular/core';

import { InventorydataService } from '../services/inventorydata.service';
import { Tax } from '../models/Tax'

@Pipe({
  name: 'determine'
})
export class DeterminePipe implements PipeTransform {

  taxes : Tax[];
  categories : any[];

  constructor(private _inventorydataService: InventorydataService) {
    this._inventorydataService.getTaxes().subscribe(result => {
      this.taxes = result;
    })
    this._inventorydataService.getCategory().subscribe(result => {
      this.categories = result;
    })
  }

  transform(id: number, type: string = 'tax'): string {

    let result = '';

    (type==='tax')
    ?this.taxes.some((cur, index) => {
      if(cur.taxid === id){
        result = cur.taxname;
        return true;
      }
      return false;
    })
    :this.categories.some((cur, index) => {
      if(cur.id === id){
        result = cur.name;
        return true;
      }
      return false;
    })
    return result;
  }

}
