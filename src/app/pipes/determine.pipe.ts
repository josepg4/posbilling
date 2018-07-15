import { Pipe, PipeTransform } from '@angular/core';

import { StaticdataholdingService } from '../services/staticdataholding.service';
import { Tax } from '../models/Tax'

@Pipe({
  name: 'determine'
})
export class DeterminePipe implements PipeTransform {

  taxes : Tax[];
  categories : any[];

  constructor(private _staticdataService: StaticdataholdingService) {
    this.taxes = this._staticdataService.getTaxes();
    this.categories = this._staticdataService.getCategory();
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
