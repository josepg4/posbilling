import { Injectable, NgZone  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {ElectronService} from 'ngx-electron';

import { Item } from '../models/Item';

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
        this._router.navigateByUrl('/dashboard');
      })
      this._electronService.ipcRenderer.send('portready', this.port);
    });
    
  }

  getInventory(): Observable<Item[]> {
    return this._http.get<Item[]>(this.inventoryUrl);
  }

  savePost(item : Item) : Observable<Item>{
    return this._http.post<Item>(this.itemURL, item, httpOptions)
  }

  editItem(item : Item) : Observable<Item>{
    return this._http.post<Item>(this.itemEditURL, item, httpOptions)
  }

  removeItem(item : Item) : Observable<Item>{
    return this._http.post<Item>(this.itemRemoveURL, item, httpOptions)
  }

}
