

export class SearchParams {
    storeId: number;
    storeName="";
    itemId: number;
    itemName: string;
    itemCategory: string;
    
    supplierId: number;
    supplierName: string;
    supplyTitle:string;
    pageNumber = 1;
    pageSize = 5;
    orderBy = 'lastActive';

    constructor(
        //user: User
        ) {
      //  this.gender = user.gender === 'female' ? 'male' : 'female';
    }
}