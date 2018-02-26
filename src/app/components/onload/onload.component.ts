import { Component, OnInit } from '@angular/core';
import { InventorydataService } from '../../services/inventorydata.service';

@Component({
  selector: 'app-onload',
  templateUrl: './onload.component.html',
  styleUrls: ['./onload.component.css']
})
export class OnloadComponent implements OnInit {

  constructor(private _inventorydataService: InventorydataService) { }

  ngOnInit() {
  }

}
