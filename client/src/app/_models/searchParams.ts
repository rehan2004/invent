

export class SearchParams {
    storeId: number;
    storeName="";
    itemId: number;
    itemName: string;
    
    supplierId: number;
    supplierName: string;
    pageNumber = 1;
    pageSize = 5;
    orderBy = 'lastActive';

    constructor(
        //user: User
        ) {
      //  this.gender = user.gender === 'female' ? 'male' : 'female';
    }
}