import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { LookupService } from 'src/app/_services/lookup.service';
import { ItemsService } from 'src/app/_services/items.service';
import { SearchParams } from 'src/app/_models/searchParams';
import { ItemCategory, MeasurementUnit, Supply } from 'src/app/_models/lookups';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { Store } from 'src/app/_models/store';
import { Item } from 'src/app/_models/item';

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
  itemCategories: ItemCategory[];
  measurementUnit: MeasurementUnit[];
  supplies: Supply[];
  stores: Store[];
  pagination: Pagination;
  tempActualQuantity:number;

  user: User;

  constructor(
    public bsModalRef: BsModalRef,
    private lookupService: LookupService,
    private toastr: ToastrService,
    private itemsService: ItemsService
  ) {
    this.searchParams = this.lookupService.getSearchParams();
  }

  ngOnInit(): void {
    this.newItemModel = this.data;
    this.newItemModel.pullQuantity=0;
    this.tempActualQuantity= this.newItemModel.actualQuantity;
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
