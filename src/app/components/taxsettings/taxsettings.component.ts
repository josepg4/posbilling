import { Component, OnInit, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { InventorydataService } from '../../services/inventorydata.service';
import { ElectronService } from 'ngx-electron';


@Component({
  selector: 'app-taxsettings',
  templateUrl: './taxsettings.component.html',
  styleUrls: ['./taxsettings.component.css']
})
export class TaxsettingsComponent implements OnInit {

  public config: PaginationInstance = {
    id: 'tax',
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

  taxes : any[] = [];
  tax : any;

  constructor(private _inventorydataService: InventorydataService, private _electronService: ElectronService, private _ngZone: NgZone) { }

  ngOnInit() {
      this._inventorydataService.getTaxes().subscribe(response => {
        if(response.status == 'success'){
          this.taxes = response.data;
        }
      })
  }

  getEmptyTax() : any {
    return {
      taxid   : '',
      taxname : '',
      taxvalue : ''
    }
  }

  addNewTax() : void {
    this.tax = this.getEmptyTax();
    this.isEdit = false;
    this.isAddNew = true;
  }
  
  onAddNewTax() : void {
    if(this.tax.taxname && this.tax.taxvalue){
      this.onDC = true;
      this._inventorydataService.newTax(this.tax).subscribe(result => {
        if(result.status == 'success'){
          this.taxes = result.data;
          this.tax = this.getEmptyTax();
          this.showMessage('Added Tax!', true)
        }
        else {
          this.showMessage('Failed!!!', false)
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

  onRemove(tax : any) : void {
    this._electronService.remote.dialog.showMessageBox({message : "Delete Tax "+ tax.taxname +"?", title : "Delete Tax", buttons : ["Delete", "Cancel"]}, (response) => {
      this._ngZone.run(() => {
        if(response === 0){
          this._inventorydataService.removeTax(tax.taxid, 0).subscribe(result => {
            console.log(result);
            if(result.status == 'success'){
              this._inventorydataService.getTaxes().subscribe(taxes => {
                this.taxes = taxes.data;
              })
            }else{
    
            }
          })
        }
      })
    })
  }

}
