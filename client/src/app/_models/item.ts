import { Photo } from './photo';

export interface Item {
    id: number;
    
    itemName: string;
    actualQuantity:string;
    quantity:string;
    serialNumber :string;
    measurementUnit: string;
    storeName: string;
    categoryName:string;


    measurementUnitId:number;
    storeId:number;
    supplyId:number;
    categoryId:number;
    description:string;
    
  }
  
