import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/_models/store';
import { StoresService } from 'src/app/_services/stores.service';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/_models/pagination';
import { SearchParams } from 'src/app/_models/searchParams';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {
  public stores: Store[];
  pagination: Pagination;
  searchParams: SearchParams;
  user: User;
  storeList = [{ value: '1', display: 'Store on GF' }, { value: '2', display: 'Store at Main building' },
  { value: '3', display: 'Main store' }];

  constructor(private storeService: StoresService) {
    this.searchParams = this.storeService.getSearchParams();
  }

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores() {
    this.storeService.setSearchParams(this.searchParams);
    this.storeService.getStores(this.searchParams).subscribe(response => {
      this.stores = response.result;
      this.pagination = response.pagination;
    })
  }

  resetFilters() {
    this.searchParams = this.storeService.resetSearchParams();
    this.loadStores();
  }

  pageChanged(event: any) {
    this.searchParams.pageNumber = event.page;
    this.storeService.setSearchParams(this.searchParams);
    this.loadStores();
  }
}
