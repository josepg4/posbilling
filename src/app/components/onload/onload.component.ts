import { Component, OnInit } from '@angular/core';
import { InventorydataService } from '../../services/inventorydata.service';
import { StaticdataholdingService } from '../../services/staticdataholding.service';

@Component({
  selector: 'app-onload',
  templateUrl: './onload.component.html',
  styleUrls: ['./onload.component.css']
})
export class OnloadComponent implements OnInit {

  constructor(private _inventorydataService: InventorydataService, private _staticdataService: StaticdataholdingService) { }

  ngOnInit() {
  }

}
