import { Pipe, PipeTransform } from '@angular/core';
import { StaticdataholdingService } from '../services/staticdataholding.service';

@Pipe({
  name: 'offer'
})
export class OfferPipe implements PipeTransform {

  transform(offerid: number, offertype: string, offervalue: number, offername : string): string {
    if(!offerid){
      return '--';
    }else if (offerid === 1){
      let unit = (offertype==='rupee')? '\&\#8377\;' : '%';
      return offervalue.toString()+ ' ' + unit;
    }else {
      let unit = (offertype==='rupee')? '\&\#8377\;' : '%';
      return offername + ' | ' + offervalue.toString() + ' ' + unit ;
    }
  }

}
