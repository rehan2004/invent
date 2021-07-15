import { User } from './user';

export class UserParams {
    gender: string;
    minAge = 18;
    maxAge = 99;
    pageNumber = 1;
    pageSize = 12;
    orderBy = 'lastActive';
    itemName:string;
    supplierName:string;
    supplyTitle:string;

    constructor(user: User) {
        this.gender = user.gender === 'female' ? 'male' : 'female';
    }
}