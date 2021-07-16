import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ItemCategory, MeasurementUnit,Supply } from '../_models/lookups';
import { of, pipe } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';
import { SearchParams } from '../_models/searchParams';
import { AccountService } from './account.service';
import { User } from '../_models/user';
import { Store } from '../_models/store';

import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { Supplier } from '../_models/supplier';


@Injectable({
  providedIn: 'root'
})
export class LookupService {
  baseUrl = environment.apiUrl;
  itemcategories: ItemCategory[] = [];
  itemCategoryCache = new Map();
  measurementUnits: MeasurementUnit[] = [];
  measurementUnitCache= new Map();
  supply: Supply[] = [];
  supplyCache= new Map();
  storeCache= new Map();
  suppliersCache= new Map();
  
  searchParams: SearchParams;
  user: User;
//service for aall lookups
  constructor(private http: HttpClient, private accountService: AccountService) {
     this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.searchParams = new SearchParams();
     })
  }

  getSearchParams() {
    return this.searchParams;
  }

  setSearchParams(params: SearchParams) {
    this.searchParams = params;
  }

  resetSearchParams() {
    this.searchParams = new SearchParams();
    return this.searchParams;
  }

  
  getItemCategory(searchParams: SearchParams) {
    var response = this.itemCategoryCache.get(Object.values(searchParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = getPaginationHeaders(searchParams.pageNumber, searchParams.pageSize);
    params = params.append('orderBy', searchParams.orderBy);

    return getPaginatedResult<ItemCategory[]>(this.baseUrl + 'lookup/category', params, this.http)
      .pipe(map(response => {
        this.itemCategoryCache.set(Object.values(searchParams).join('-'), response);
        return response;
      }))
  }

  getMeasurementUnit(searchParams: SearchParams) {
    var response = this.measurementUnitCache.get(Object.values(searchParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = getPaginationHeaders(searchParams.pageNumber, searchParams.pageSize);
    params = params.append('orderBy', searchParams.orderBy);

    return getPaginatedResult<MeasurementUnit[]>(this.baseUrl + 'lookup/measurementunit', params, this.http)
      .pipe(map(response => {
        this.measurementUnitCache.set(Object.values(searchParams).join('-'), response);
        return response;
      }))
  }


  getSupply(searchParams: SearchParams) {
    var response = this.supplyCache.get(Object.values(searchParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = getPaginationHeaders(searchParams.pageNumber, searchParams.pageSize);
    params = params.append('orderBy', searchParams.orderBy);

    return getPaginatedResult<Supply[]>(this.baseUrl + 'lookup/supply', params, this.http)
      .pipe(map(response => {
        this.supplyCache.set(Object.values(searchParams).join('-'), response);
        return response;
      }))
  }

  getStores(searchParams: SearchParams) {
    var response = this.storeCache.get(Object.values(searchParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = getPaginationHeaders(searchParams.pageNumber, searchParams.pageSize);
    params = params.append('orderBy', searchParams.orderBy);

    return getPaginatedResult<Store[]>(this.baseUrl + 'stores', params, this.http)
      .pipe(map(response => {
        this.supplyCache.set(Object.values(searchParams).join('-'), response);
        return response;
      }))
  }

  getSuppliers(searchParams: SearchParams) {
    var response = this.suppliersCache.get(Object.values(searchParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = getPaginationHeaders(searchParams.pageNumber, searchParams.pageSize);
    params = params.append('orderBy', searchParams.orderBy);

    return getPaginatedResult<Supplier[]>(this.baseUrl + 'suppliers/suppliers', params, this.http)
      .pipe(map(response => {
        this.supplyCache.set(Object.values(searchParams).join('-'), response);
        return response;
      }))
  }

  
  
  
}
