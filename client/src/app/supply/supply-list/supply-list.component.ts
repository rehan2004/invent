import { Component, OnInit } from '@angular/core';
import { Supply } from 'src/app/_models/supply';
import { Store } from 'src/app/_models/store';
import { SupplyService } from 'src/app/_services/supply.service';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { SearchParams } from 'src/app/_models/searchParams';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/_services/modal.service';
import { LookupService } from 'src/app/_services/lookup.service';

@Component({
  selector: 'app-supply-list',
  templateUrl: './supply-list.component.html',
  styleUrls: ['./supply-list.component.css'],
})
export class SupplyListComponent implements OnInit {
  public stores: Store[];
  bsModalRef: BsModalRef;
  supplies: Supply[];
  pagination: Pagination;
  userParams: UserParams;
  searchParams: SearchParams;
  user: User;
  
  constructor(
    private supplyService: SupplyService,
    private modalService: ModalService,
    private lookupService: LookupService,
  ) {
    this.userParams = this.supplyService.getUserParams();
    this.searchParams = this.lookupService.getSearchParams();
  }

  ngOnInit(): void {
    this.loadSupplies();
    this.loadStores()
  }


 
  loadStores() {
    this.lookupService.setSearchParams(this.searchParams);
    this.lookupService.getStores(this.searchParams).subscribe((response) => {
      this.stores = response.result;
      this.pagination = response.pagination;
    });
  }


  loadSupplies() {
    if (this.searchParams.supplyTitle)
    this.userParams.supplyTitle = this.searchParams.supplyTitle;
    else
    this.userParams.supplyTitle = null;
    console.log( this.userParams)
    this.supplyService.setUserParams(this.userParams);
    this.supplyService.getSupplies(this.userParams).subscribe((response) => {
      this.supplies = response.result;
      this.pagination = response.pagination;
    });
  }

  openAddSupplyModal() {
    this.modalService.confirm('Add New Supply', 'AddSupplyDialogComponent', null).subscribe((result) => {
      if (result) {
      }
    });
  }
  resetFilters() {
   
    this.userParams = this.supplyService.resetUserParams();
    this.searchParams.supplyTitle=null;
    this.loadSupplies();
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.supplyService.setUserParams(this.userParams);
    this.loadSupplies();
  }
}
