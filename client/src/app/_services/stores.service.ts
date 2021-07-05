import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '../_models/store';
import { of, pipe } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';
import { SearchParams } from '../_models/searchParams';
import { AccountService } from './account.service';
import { User } from '../_models/user';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class StoresService {
  baseUrl = environment.apiUrl;
  stores: Store[] = [];
  storeCache = new Map();
  user: User;
  searchParams: SearchParams;

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

  getStores(searchParams: SearchParams) {
    var response = this.storeCache.get(Object.values(searchParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = getPaginationHeaders(searchParams.pageNumber, searchParams.pageSize);

     params = params.append('storeName', searchParams.storeName.toString());
    // params = params.append('maxAge', searchParams.maxAge.toString());
    // params = params.append('gender', searchParams.gender);
    params = params.append('orderBy', searchParams.orderBy);

    return getPaginatedResult<Store[]>(this.baseUrl + 'stores', params, this.http)
      .pipe(map(response => {
        this.storeCache.set(Object.values(searchParams).join('-'), response);
        return response;
      }))
  }

  
  
}
