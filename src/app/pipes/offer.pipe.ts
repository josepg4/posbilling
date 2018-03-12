import { Pipe, PipeTransform } from '@angular/core';
import { InventorydataService } from '../services/inventorydata.service';

@Pipe({
  name: 'offer'
})
export class OfferPipe implements PipeTransform {

  offers : any[];

  constructor(private _inventorydataService: InventorydataService) {
    this._inventorydataService.getOffers().subscribe(result => {
      this.offers = result;
    })
  }

  transform(offerid: number, offertype: string, offervalue: number): string {
    if(!offerid){
      return '--';
    }else if (offerid === 1){
      let unit = (offertype==='rupee')? '\&\#8377\;' : '%';
      return offervalue.toString()+ ' ' + unit;
    }else {
      let offername : string = '';
      this.offers.some((cur, index) => {
        if(cur.offerid === offerid){
          offername = this.offers[index].name;
          return true;
        }
        return false;
      })
      let unit = (offertype==='rupee')? '\&\#8377\;' : '%';
      return offername + ' | ' + offervalue.toString() + ' ' + unit ;
    }
  }

}
