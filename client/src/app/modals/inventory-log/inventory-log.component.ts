import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { LookupService } from 'src/app/_services/lookup.service';
import { SearchParams } from 'src/app/_models/searchParams';
import { ItemCategory, MeasurementUnit, Supply } from 'src/app/_models/lookups';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { Inventory } from 'src/app/_models/inventory';
import { InventoriesService } from 'src/app/_services/inventories.service';



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
  searchParams: SearchParams;
  itemModel: any = {};
  inventories: Inventory[];
  pagination: Pagination;
  tempActualQuantity:number;
  user: User;

  constructor(
    public bsModalRef: BsModalRef,
    private lookupService: LookupService,
    private toastr: ToastrService,
    private inventoryService: InventoriesService
  ) {
    this.searchParams = this.inventoryService.getSearchParams();
  }

  ngOnInit(): void {
    this.itemModel = this.data;
    this.loadInventory();
  }
  
 

  loadInventory() {
    this.searchParams.itemId = this.itemModel.id;
    this.inventoryService.setSearchParams(this.searchParams);
    this.inventoryService.getInventories(this.searchParams).subscribe(response => {
      this.inventories = response.result;
      this.pagination = response.pagination;
    })
  }

  resetFilters() {
    this.searchParams = this.inventoryService.resetSearchParams();
    this.loadInventory();
  }

  pageChanged(event: any) {
    this.searchParams.pageNumber = event.page;
    this.inventoryService.setSearchParams(this.searchParams);
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
