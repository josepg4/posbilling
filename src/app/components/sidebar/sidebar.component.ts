import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {

    isDashClicked: boolean;
    isInventoryClicked: boolean;
    isContactClicked: boolean;
    isListItemsClicked: boolean;
    isNewItemClicked: boolean;
    isNewPurchaseClicked: boolean;
    isPurchaseHistoryClicked: boolean;
    isNewBillingClicked: boolean;
    isBillingHistoryClicked: boolean;

    constructor (private router : Router) {
        this.isDashClicked = true;
        this.isInventoryClicked = false;
        this.isContactClicked = false;
        this.isListItemsClicked = false;
        this.isNewItemClicked = false;
        this.isNewPurchaseClicked = false;
        this.isPurchaseHistoryClicked = false;
        this.isNewBillingClicked = false;
        this.isBillingHistoryClicked = false;
    }

    sidebarBtnClicked(input : number){
        switch(input){
            case 1:{
                this.router.navigateByUrl('');
                break;
            }
            case 2:{
                this.router.navigateByUrl('/inventory');
                break;
            }
            case 3:{
                
                break;
            }
            case 4:{
                this.router.navigateByUrl('/items');
                break;
            }
            case 5:{
                break;
            }
            case 6:{
                break;
            }
            case 7:{
                break;
            }
            case 8:{
                this.router.navigateByUrl('/newbill');
                break;
            }
            case 9:{
                this.router.navigateByUrl('/billhistory');
                break;
            }
        }
        

        this.isDashClicked = (input==1);
        this.isInventoryClicked = (input==2);
        this.isContactClicked = (input==3);
        this.isListItemsClicked = (input==4);
        this.isNewItemClicked = (input==5);
        this.isNewPurchaseClicked = (input==6);
        this.isPurchaseHistoryClicked = (input==7);
        this.isNewBillingClicked = (input==8);
        this.isBillingHistoryClicked = (input==9);
    }

}
