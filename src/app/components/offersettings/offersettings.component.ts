import { Component, OnInit, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { InventorydataService } from '../../services/inventorydata.service';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-offersettings',
  templateUrl: './offersettings.component.html',
  styleUrls: ['./offersettings.component.css']
})
export class OffersettingsComponent implements OnInit {

  public config: PaginationInstance = {
    id: 'offer',
    itemsPerPage: 5,
    currentPage: 1
  };

  message : any = {
    show_msg : false,
    isSuccess : true,
    value : "",
  }

  isAddNew : boolean = false;
  isEdit : boolean = false;
  onDC : boolean = false;

  offers : any[] = [];
  offer : any;

  constructor(private _inventorydataService: InventorydataService, private _electronService: ElectronService, private _ngZone: NgZone) { }

  ngOnInit() {
    this._inventorydataService.getOffers().subscribe(response => {
      if(response.status = 'success'){
        this.offers = response.data;
        console.log(this.offers);
      }
    })
  }

  getEmptyOffer() : any {
    return {
      offerid : '',
      name : '',
      type : '',
      value : 0
    }
  }

  addNewOffer() : void {
    this.offer = this.getEmptyOffer();
    this.isEdit = false;
    this.isAddNew = true;
  }
  
  onAddNewOffer() : void {
    if(this.offer.name && this.offer.type && this.offer.value){
      this.onDC = true;
      this._inventorydataService.newOffer(this.offer).subscribe(result => {
        if(result.status == 'success'){
          this.offers = result.data;
          this.offer = this.getEmptyOffer();
          this.showMessage('Added Offer!', true)
          this.isAddNew = false;
        }
        else {
          this.showMessage('Failed!!!', false)
        }
      })
    }else {

    }
  }

  onEdit(offer : any) : void {
    this.offer = this.getEmptyOffer();
    this.isAddNew = false;
    this.isEdit = true;
    this.offer.offerid = offer.offerid;
    this.offer.name = offer.name;
    this.offer.type = offer.description;
    this.offer.value = offer.value;
    console.log(this.offer)
  }

  onEditConfirm() : void {
    if(this.offer.name && this.offer.type && this.offer.value){
      this.onDC = true;
      this._inventorydataService.updateOffer(this.offer).subscribe(result => {
        console.log(result)
        if(result.status == 'success'){
          this.showMessage('Updated', true)
          this._inventorydataService.getOffers().subscribe(offers => {
            this.offers = offers.data;
          })
          this.isEdit = false;
        }else{

        }
      })
    }else {

    }
  }

  showMessage(message : string, isSuccess : boolean) : void {
    this.message.value = message;
    this.message.isSuccess = isSuccess;
    this.message.show_msg = true;
    setTimeout(() => {
      this.message.show_msg = false;
    }, 3000);
  }

  onCancel() : void {
    this.isEdit = false;
    this.isAddNew = false;
  }

  onRemove(offer : any) : void {
    this._electronService.remote.dialog.showMessageBox({message : "Delete Offer "+ offer.name +"?", title : "Delete Offer", buttons : ["Delete", "Cancel"]}, (response) => {
      this._ngZone.run(() => {
        if(response === 0){
          this._inventorydataService.removeOffer(offer.offerid, 0).subscribe(result => {
            console.log(result);
            if(result.status == 'success'){
              this._inventorydataService.getOffers().subscribe(offers => {
                this.offers = offers.data;
              })
            }else{
    
            }
          })
        }
      })
    })
  }

}
