import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { LookupService } from 'src/app/_services/lookup.service';
import { ItemsService } from 'src/app/_services/items.service';
import { SearchParams } from 'src/app/_models/searchParams';
import { ItemCategory, MeasurementUnit, Supply } from 'src/app/_models/lookups';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { Inventory } from 'src/app/_models/inventory';
import { UserParams } from 'src/app/_models/userParams';


@Component({
  selector: 'app-inventory-log',
  templateUrl: './inventory-log.component.html',
  styleUrls: ['./inventory-log.component.css'],
})
export class InventoryLogComponent implements OnInit {
  title: string;
  message: string;
  btnOkText: string;
  btnCancelText: string;
  data:any;
  result: boolean;
  public searchParams: SearchParams;
  newItemModel: any = {};
  inventories: Inventory[];
  pagination: Pagination;
  tempActualQuantity:number;
  userParams: UserParams;
  user: User;

  constructor(
    public bsModalRef: BsModalRef,
    private lookupService: LookupService,
    private toastr: ToastrService,
    private itemsService: ItemsService
  ) {
    this.userParams = this.itemsService.getUserParams();
  }

  ngOnInit(): void {
    this.newItemModel = this.data;
  }
  
 

  loadInventory() {
    this.itemsService.setUserParams(this.userParams);
    this.itemsService.getInventories(this.userParams).subscribe((response) => {
      this.inventories = response.result;
      this.pagination = response.pagination;
    });
  }

  resetFilters() {
    this.userParams = this.itemsService.resetUserParams();
    this.loadInventory();
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.itemsService.setUserParams(this.userParams);
    this.loadInventory();
  }
  confirm() {
    this.result = true;
    this.bsModalRef.hide();
  }

  decline() {
    this.result = false;
    this.bsModalRef.hide();
  }
}
