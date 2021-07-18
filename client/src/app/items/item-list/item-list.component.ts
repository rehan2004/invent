import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/_models/item';
import { Store } from 'src/app/_models/store';
import { ItemsService } from 'src/app/_services/items.service';
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
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {
  public stores: Store[];
  public viewModel: any={}
  bsModalRef: BsModalRef;
  items: Item[];
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
    private itemService: ItemsService,
    private modalService: ModalService,
    private lookupService: LookupService,
  ) {
    this.userParams = this.itemService.getUserParams();
    this.searchParams = this.lookupService.getSearchParams();
  }

  ngOnInit(): void {
    this.loadItems();
    this.loadStores()
    this.viewModel.ViewType="Card View"
  }


 
  loadStores() {
    this.lookupService.setSearchParams(this.searchParams);
    this.lookupService.getStores(this.searchParams).subscribe((response) => {
      this.stores = response.result;
      this.pagination = response.pagination;
    });
  }

  toggleView()
  {
    if (this.viewModel.ViewType=="List View")
    this.viewModel.ViewType="Card View"
    else
    this.viewModel.ViewType="List View"
  }

  loadItems() {
    if (this.searchParams.itemName)
    this.userParams.itemName = this.searchParams.itemName;
    else
    this.userParams.itemName = null;
    console.log( this.userParams)
    this.itemService.setUserParams(this.userParams);
    this.itemService.getItems(this.userParams).subscribe((response) => {
      this.items = response.result;
      this.pagination = response.pagination;
    });
  }

  openAddItemModal() {
    this.modalService.confirm('Add New Item', 'AddItemDialogComponent', null).subscribe((result) => {
      if (result) {
      }
    });
  }
  resetFilters() {
   
    this.userParams = this.itemService.resetUserParams();
    this.searchParams.itemName=null;
    this.loadItems();
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.itemService.setUserParams(this.userParams);
    this.loadItems();
  }
}
