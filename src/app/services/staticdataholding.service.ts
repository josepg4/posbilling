import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ElectronService} from 'ngx-electron';

@Injectable()
export class StaticdataholdingService {

  port : string;

  taxes : any[] = [];
  category : any[] = [];
  offers : any[] = [];

  taxURL : string = 'http://localhost:3000/api/tax';
  categoryURL : string = 'http://localhost:3000/api/category';
  offerURL : string = 'http://localhost:3000/api/offers';

  constructor(private _http: HttpClient, private _electronService: ElectronService, private _ngZone: NgZone) { 
    this._electronService.ipcRenderer.on('port', (event, port) => {
      this._ngZone.run(() => {
        this.port = port.toString();
        this.taxURL = 'http://localhost:' + this.port+ '/api/tax';
        this.categoryURL      = 'http://localhost:' + this.port + '/api/category';
        this.offerURL = 'http://localhost:' + this.port+ '/api/offers';

        this._http.get<any>(this.taxURL).subscribe(items => {
          this.taxes = items;
        });
        this._http.get<any>(this.categoryURL).subscribe(items => {
          this.category = items;
        });
        this._http.get<any>(this.offerURL).subscribe(items => {
          this.offers = items;
        });
      })
      this._electronService.ipcRenderer.send('initialdataready', this.port);
    });
    
  }

  getTaxes(){
    return this.taxes;
  }

  getCategory(){
    return this.category;
  }

  getOffers(){
    return this.offers;
  }

}
