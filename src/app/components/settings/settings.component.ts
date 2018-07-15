import { Component, OnInit } from '@angular/core';
import { UsersettingsComponent } from '../usersettings/usersettings.component';
import { CategorysettingsComponent } from '../categorysettings/categorysettings.component';
import { TaxsettingsComponent } from '../taxsettings/taxsettings.component';
import { OffersettingsComponent } from '../offersettings/offersettings.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
