export interface BillingItem {
    prodid    : string,
    prodname  : string,
    quantity  : number,
    unitprice : number,
    tax       : number,
    offvalue  : number
}

export interface Bill {
    id?     : number,
    billid  : string,
    tax     : number,
    offvalue: number,
    total     : number,  
    items   : BillingItem[]
}