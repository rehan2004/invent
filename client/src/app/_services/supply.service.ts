import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Supply } from '../_models/supply';
import { of, pipe } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { User } from '../_models/user';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class SupplyService {
  baseUrl = environment.apiUrl;
  supplies: Supply[] = [];
  supplierCache = new Map();
  user: User;
  userParams: UserParams;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    })
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  resetUserParams() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  
  saveSupply(newSupplyModel: any) {
    console.log(newSupplyModel)
    return this.http.post(this.baseUrl + 'supplies/savesupplier/' , newSupplyModel, {})
  }


  updateInventory(newSupplyModel: any) {
    console.log(newSupplyModel)
    return this.http.post(this.baseUrl + 'supplies/updateinventory/' , newSupplyModel, {})
  }


  getSupplyInventory(userParams: UserParams)
  {
    var response = this.supplierCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    params = params.append('supplierId', userParams.minAge.toString());

    params = params.append('orderBy', userParams.orderBy);

    return getPaginatedResult<Supply[]>(this.baseUrl + 'supplies/supplies', params, this.http)
      .pipe(map(response => {
        this.supplierCache.set(Object.values(userParams).join('-'), response);
        return response;
      }))

  }

  getSupplies(userParams: UserParams) {
    var response = this.supplierCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
if (userParams.supplierName)
     params = params.append('supplierName', userParams.supplierName.toString());
    // params = params.append('maxAge', userParams.maxAge.toString());
    // params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return getPaginatedResult<Supply[]>(this.baseUrl + 'supplies/supplies', params, this.http)
      .pipe(map(response => {
        this.supplierCache.set(Object.values(userParams).join('-'), response);
        return response;
      }))
  }

  getMember(username: string) {
    const supplier = [...this.supplierCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((supplier: Supply) => supplier.supplyTitle !== '');

    if (supplier) {
      return of(supplier);
    }
    return this.http.get<Supply>(this.baseUrl + 'users/' + username);
  }

  updateMember(supplier: Supply) {
    return this.http.put(this.baseUrl + 'users', supplier).pipe(
      map(() => {
        const index = this.supplies.indexOf(supplier);
        this.supplies[index] = supplier;
      })
    )
  }

 
  
}
