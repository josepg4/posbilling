import { Component, OnInit, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { InventorydataService } from '../../services/inventorydata.service';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-categorysettings',
  templateUrl: './categorysettings.component.html',
  styleUrls: ['./categorysettings.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CategorysettingsComponent implements OnInit {

  public config: PaginationInstance = {
    id: 'category',
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

  categories : any[] = [];
  category : any;

  constructor(private _inventorydataService: InventorydataService, private _electronService: ElectronService, private _ngZone: NgZone) { }

  ngOnInit() {
    this._inventorydataService.getCategory().subscribe(response => {
      this.categories = response.data;
    })
  }

  getEmptyCategory() : any {
    return {
      name : '',
      description : ''
    }
  }

  addNewCategory() : void {
    this.category = this.getEmptyCategory();
    this.isEdit = false;
    this.isAddNew = true;
  }
  
  onAddNewCategory() : void {
    if(this.category.name && this.category.description){
      this.onDC = true;
      this._inventorydataService.newCategory(this.category).subscribe(result => {
        if(result.status == 'success'){
          this.categories = result.data;
          this.category = this.getEmptyCategory();
          this.showMessage('Added Category!', true)
        }
        else {
          this.showMessage('Failed!!!', false)
        }
      })
    }else {

    }
  }

  onEdit(category : any) : void {
    this.category = this.getEmptyCategory();
    this.isAddNew = false;
    this.isEdit = true;
    this.category.id = category.id;
    this.category.name = category.name;
    this.category.description = category.description;
  }

  onEditConfirm() : void {
    if(this.category.name && this.category.description){
      this.onDC = true;
      this._inventorydataService.updateCategory(this.category).subscribe(result => {
        if(result.status == 'success'){
          this.showMessage('Updated', true)
          this._inventorydataService.getCategory().subscribe(categories => {
            this.categories = categories.data;
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

  onRemove(category : any) : void {
    this._electronService.remote.dialog.showMessageBox({message : "Delete Category "+ category.name +"?", title : "Delete Category", buttons : ["Delete", "Cancel"]}, (response) => {
      this._ngZone.run(() => {
        if(response === 0){
          this._inventorydataService.removeCategory(category.id).subscribe(result => {
            console.log(result);
            if(result.status == 'success'){
              this._inventorydataService.getCategory().subscribe(categories => {
                this.categories = categories.data;
              })
            }else{
    
            }
          })
        }
      })
    })
  }

}
