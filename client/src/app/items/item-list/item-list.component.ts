import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/_models/item';
import { ItemsService } from 'src/app/_services/items.service';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  bsModalRef: BsModalRef;
  items: Item[];
  pagination: Pagination;
  userParams: UserParams;
  user: User;
  genderList = [{ value: 'store1', display: 'Store-1' }, { value: 'store2', display: 'Store-2' },
  { value: 'store3', display: 'Store-3' }];

  constructor(private itemService: ItemsService, private modalService: ModalService) {
    this.userParams = this.itemService.getUserParams();
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.itemService.setUserParams(this.userParams);
    this.itemService.getItems(this.userParams).subscribe(response => {
      this.items = response.result;
      this.pagination = response.pagination;
    })
  }

  openAddItemModal() {
    this.modalService.confirm('Add New Item', '').subscribe(result => {
      if (result) {
       
      }
    })

  }
  resetFilters() {
    this.userParams = this.itemService.resetUserParams();
    this.loadItems();
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.itemService.setUserParams(this.userParams);
    this.loadItems();
  }
}