import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/_models/supplier';
import { Store } from 'src/app/_models/store';
import { SuppliersService } from 'src/app/_services/suppliers.service';
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
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css'],
})
export class SupplierListComponent implements OnInit {
  public stores: Store[];
  bsModalRef: BsModalRef;
  suppliers: Supplier[];
  pagination: Pagination;
  userParams: UserParams;
  searchParams: SearchParams;
  user: User;
  // genderList = [
  //   { value: 'store1', display: 'Store-1' },
  //   { value: 'store2', display: 'Store-2' },
  //   { value: 'store3', display: 'Store-3' },
  // ];

  constructor(
    private supplierService: SuppliersService,
    private modalService: ModalService,
    private lookupService: LookupService,
  ) {
    this.userParams = this.supplierService.getUserParams();
    this.searchParams = this.lookupService.getSearchParams();
  }

  ngOnInit(): void {
    this.loadSuppliers();
    this.loadStores()
  }


 
  loadStores() {
    this.lookupService.setSearchParams(this.searchParams);
    this.lookupService.getStores(this.searchParams).subscribe((response) => {
      this.stores = response.result;
      this.pagination = response.pagination;
    });
  }


  loadSuppliers() {
    if (this.searchParams.supplierName)
    this.userParams.supplierName = this.searchParams.supplierName;
    else
    this.userParams.supplierName = null;
    console.log( this.userParams)
    this.supplierService.setUserParams(this.userParams);
    this.supplierService.getSuppliers(this.userParams).subscribe((response) => {
      this.suppliers = response.result;
      this.pagination = response.pagination;
    });
  }

  openAddSupplierModal() {
    this.modalService.confirm('Add New Supplier', 'AddSupplierDialogComponent', null).subscribe((result) => {
      if (result) {
      }
    });
  }
  resetFilters() {
   
    this.userParams = this.supplierService.resetUserParams();
    this.searchParams.supplierName=null;
    this.loadSuppliers();
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.supplierService.setUserParams(this.userParams);
    this.loadSuppliers();
  }
}
