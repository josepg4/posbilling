export interface PurchaseItem {
    prodid     : string,
    prodname   : string,
    sellingprice? : number,
    discount?  : number,
    quantity   : number,
    unitprice  : number,
    tax        : number,
    hasoff     : number,
    offtype    : string,
    total?     : number
}

export interface Purchase {
    id?        : number,
    purchaseid : string,
    discount   : number,
    total      : number,
    created_by?:string,
    created_at?:Date,
    items      : PurchaseItem[]
}