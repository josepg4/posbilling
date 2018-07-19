import { Injectable, NgZone  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {ElectronService} from 'ngx-electron';

import { Item } from '../models/Item';
import { Bill, BillingItem } from '../models/Bill';
import { Tax } from '../models/Tax';
import { Purchase, PurchaseItem } from '../models/Purchase';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()
export class InventorydataService {

  port : string;

  inventoryUrl: string = 'http://localhost:3000/api/inventory';
  itemURL     : string = 'http://localhost:3000/api/item';
  itemEditURL : string = 'http://localhost:3000/api/itemedit';
  itemRemoveURL : string = 'http://localhost:3000/api/itemremove';
  itemIdURL : string = 'http://localhost:3000/api/storeid';
  newbillURL : string = 'http://localhost:3000/api/newbill';
  billURL : string = 'http://localhost:3000/api/bill';
  billItemsURL : string = 'http://localhost:3000/api/billitems';
  taxURL : string = 'http://localhost:3000/api/tax';
  categoryURL : string = 'http://localhost:3000/api/category';
  updateCategoryURL : string = 'http://localhost:3000/api/updatecategory';
  offerURL : string = 'http://localhost:3000/api/offers';
  purchaseURL : string = 'http://localhost:3000/api/purchase';
  purchaseItemURL : string = 'http://localhost:3000/api/purchaseitems';
  usersURL : string = 'http://localhost:3000/api/users';
  userURL : string = 'http://localhost:3000/api/user';
  editUserURL : string = 'http://localhost:3000/api/updateuser';
  removeUserURL = 'http://localhost:3000/api/removeuser';

  inventory : Item[] = [];
  updatedItem : Item;

  constructor(private _http: HttpClient, private _router: Router, private _electronService: ElectronService, private _ngZone: NgZone) { 
    this._electronService.ipcRenderer.on('port', (event, port) => {
      this._ngZone.run(() => {
        this.port = port.toString();
        this.inventoryUrl = 'http://localhost:' + this.port+ '/api/inventory';
        this.itemURL      = 'http://localhost:' + this.port + '/api/item';
        this.itemEditURL = 'http://localhost:' + this.port+ '/api/itemedit';
        this.itemRemoveURL  = 'http://localhost:' + this.port + '/api/itemremove';
        this.itemIdURL = 'http://localhost:' + this.port+ '/api/storeid';
        this.newbillURL = 'http://localhost:' + this.port+ '/api/newbill';
        this.billURL = 'http://localhost:' + this.port+ '/api/bill';
        this.billItemsURL = 'http://localhost:' + this.port+ '/api/billitems';
        this.taxURL = 'http://localhost:' + this.port+ '/api/tax';
        this.categoryURL = 'http://localhost:' + this.port+ '/api/category';
        this.offerURL = 'http://localhost:' + this.port+ '/api/offers';
        this.purchaseURL = 'http://localhost:' + this.port+ '/api/purchase';
        this.purchaseItemURL = 'http://localhost:' + this.port+ '/api/purchaseitems';
        this.usersURL = 'http://localhost:' + this.port+ '/api/users';
        this.userURL = 'http://localhost:' + this.port+ '/api/user';
        this.editUserURL = 'http://localhost:' + this.port +'/api/updateuser';
        this.removeUserURL = 'http://localhost:' + this.port +'/api/removeuser';
        this.updateCategoryURL = 'http://localhost:' + this.port + '/api/updatecategory';
      })
      this._electronService.ipcRenderer.send('portready', this.port);
    });
    this._electronService.ipcRenderer.on('readytoshow', (event, port) => {
      this._ngZone.run(()=> {
        this._router.navigateByUrl('/inventory');
        console.log("inside ready to show")
      })
      this._electronService.ipcRenderer.send('windowreadytoshow', this.port);
    });
  }

  getInventory(): Observable<Item[]> {
    return this._http.get<Item[]>(this.inventoryUrl);
  }

  savePost(item : Item) : Observable<Item>{
    return this._http.post<Item>(this.itemURL, item, httpOptions)
  }

  newBill(bill : Bill) : Observable<any>{
    return this._http.post<any>(this.newbillURL, bill, httpOptions)
  }

  editItem(item : Item) : Observable<Item>{
    return this._http.post<Item>(this.itemEditURL, item, httpOptions)
  }

  removeItem(item : Item) : Observable<Item>{
    return this._http.post<Item>(this.itemRemoveURL, item, httpOptions)
  }

  getstoredId() : Observable<any>{
    return this._http.get<any>(this.itemIdURL);
  }

  getBill(parameters : {dateFrom : string, dateTo : string}) : Observable<any>{
    return this._http.get<any>(this.billURL, {params : parameters})
  }

  getBillItems(billId : string) : Observable<BillingItem[]>{
    return this._http.get<BillingItem[]>(this.billItemsURL, {params : {billid : billId}})
  }

  newPurchase(purchase : Purchase) : Observable<any>{
    return this._http.post<any>(this.purchaseURL, purchase, httpOptions)
  }

  getPurchase(parameters: {dateFrom : string, dateTo : string}) : Observable<any>{
    return this._http.get<any>(this.purchaseURL, {params: parameters})
  }

  getPurchaseItems(purchaseId : string) : Observable<PurchaseItem[]>{
    return this._http.get<PurchaseItem[]>(this.purchaseItemURL, {params : {purchaseid : purchaseId}})
  }

  removeTax(id : number): Observable<any> {
    return this._http.delete<any>(this.taxURL + "/?id=" + id, httpOptions)
  }
  
  getUsers(): Observable<any> {
    return this._http.get<any>(this.usersURL)
  }

  newUser(user : any) : Observable<any>{
    return this._http.post<any>(this.userURL, user, httpOptions)
  }

  updateUser(user : any) : Observable<any>{
    return this._http.post<any>(this.editUserURL, user, httpOptions)
  }

  removeUser(user : any) : Observable<any>{
    return this._http.post<any>(this.removeUserURL, user, httpOptions)
  }

  getCategory(): Observable<any> {
    return this._http.get<any>(this.categoryURL)
  }

  newCategory(category : any) : Observable<any>{
    return this._http.post<any>(this.categoryURL, category, httpOptions)
  }

  updateCategory(category : any) : Observable<any>{
    return this._http.post<any>(this.updateCategoryURL, category, httpOptions)
  }

  removeCategory(id : number): Observable<any> {
    return this._http.delete<any>(this.categoryURL + "/?id=" + id, httpOptions)
  }
}
