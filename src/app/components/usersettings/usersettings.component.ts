import { Component, OnInit, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { ElectronService } from 'ngx-electron';
import { InventorydataService } from '../../services/inventorydata.service';

@Component({
  selector: 'app-usersettings',
  templateUrl: './usersettings.component.html',
  styleUrls: ['./usersettings.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class UsersettingsComponent implements OnInit {

  public configuser: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 1
  };

  users: any[] = [];
  user : any;

  isAddNew : boolean = false;
  isEdit : boolean = false;
  onDC : boolean = false;

  message : any = {
    show_msg : false,
    isSuccess : true,
    value : "",
  }

  constructor(private _inventorydataService: InventorydataService, private _electronService: ElectronService, private _ngZone: NgZone) { }

  ngOnInit() {
    this._inventorydataService.getUsers().subscribe(response => {
      this.users = response.data;
    })
  }

  getEmptyUser() : any {
    return {
      username : '',
      password : '',
      canedit : false,
    }
  }

  addNewUser() : void {
    this.user = this.getEmptyUser();
    this.isEdit = false;
    this.isAddNew = true;
  }
  
  onAddNewUser() : void {
    if(this.user.username && this.user.password){
      this.onDC = true;
      this._inventorydataService.newUser(this.user).subscribe(result => {
        if(result.status == 'success'){
          this.users = result.data;
          this.user = this.getEmptyUser();
          this.showMessage('Added User!', true)
        }
        else {
          this.showMessage('Failed! try other UserName!', false)
        }
      })
    }else {

    }
  }

  onEdit(user : any) : void {
    this.user = this.getEmptyUser();
    this.isAddNew = false;
    this.isEdit = true;
    this.user.username = user.username;
    this.user.password = user.password;
    this.user.canedit = user.canedit;
  }

  onEditConfirm() : void {
    if(this.user.username && this.user.password){
      this.onDC = true;
      this._inventorydataService.updateUser(this.user).subscribe(result => {
        if(result.status == 'success'){
          this.showMessage('Updated', true)
          this._inventorydataService.getUsers().subscribe(users => {
            this.users = users;
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

  onRemove(user: any) : void {
    this._electronService.remote.dialog.showMessageBox({message : "Delete user "+ user.username +"?", title : "Delete User", buttons : ["Delete", "Cancel"]}, (response) => {
      this._ngZone.run(() => {
        if(response === 0){
          this._inventorydataService.removeUser(user).subscribe(result => {
            if(result.status == 'success'){
              this._inventorydataService.getUsers().subscribe(users => {
                this.users = users;
              })
            }else{
    
            }
          })
        }
      })
    })
  }

}
