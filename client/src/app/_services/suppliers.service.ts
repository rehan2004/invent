import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Supplier } from '../_models/supplier';
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
export class SuppliersService {
  baseUrl = environment.apiUrl;
  suppliers: Supplier[] = [];
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

  
  saveSupplier(newSupplierModel: any) {
    console.log(newSupplierModel)
    return this.http.post(this.baseUrl + 'suppliers/savesupplier/' , newSupplierModel, {})
  }


  updateInventory(newSupplierModel: any) {
    console.log(newSupplierModel)
    return this.http.post(this.baseUrl + 'suppliers/updateinventory/' , newSupplierModel, {})
  }


  getSupplierInventory(userParams: UserParams)
  {
    var response = this.supplierCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    params = params.append('supplierId', userParams.minAge.toString());

    params = params.append('orderBy', userParams.orderBy);

    return getPaginatedResult<Supplier[]>(this.baseUrl + 'suppliers/suppliers', params, this.http)
      .pipe(map(response => {
        this.supplierCache.set(Object.values(userParams).join('-'), response);
        return response;
      }))

  }

  getSuppliers(userParams: UserParams) {
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

    return getPaginatedResult<Supplier[]>(this.baseUrl + 'suppliers/suppliers', params, this.http)
      .pipe(map(response => {
        this.supplierCache.set(Object.values(userParams).join('-'), response);
        return response;
      }))
  }

  getMember(username: string) {
    const supplier = [...this.supplierCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((supplier: Supplier) => supplier.supplierName !== '');

    if (supplier) {
      return of(supplier);
    }
    return this.http.get<Supplier>(this.baseUrl + 'users/' + username);
  }

  updateMember(supplier: Supplier) {
    return this.http.put(this.baseUrl + 'users', supplier).pipe(
      map(() => {
        const index = this.suppliers.indexOf(supplier);
        this.suppliers[index] = supplier;
      })
    )
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

  addLike(username: string) {
    return this.http.post(this.baseUrl + 'likes/' + username, {})
  }

  getLikes(predicate: string, pageNumber, pageSize) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    return getPaginatedResult<Partial<Supplier[]>>(this.baseUrl + 'likes', params, this.http);
  }

  
}
