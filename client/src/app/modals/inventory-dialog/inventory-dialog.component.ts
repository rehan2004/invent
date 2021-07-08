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

@Component({
  selector: 'app-inventory-dialog',
  templateUrl: './inventory-dialog.component.html',
  styleUrls: ['./inventory-dialog.component.css'],
})
export class InventoryDialogComponent implements OnInit {
  title: string;
  message: string;
  btnOkText: string;
  btnCancelText: string;
  result: boolean;
  public searchParams: SearchParams;
  newItemModel: any = {};
  itemCategories: ItemCategory[];
  measurementUnit: MeasurementUnit[];
  supplies: Supply[];
  stores: Store[];
  pagination: Pagination;

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
    //const {unit="-1",supply="-1",itemCategory="-1"}= this.newItemModel;
    this.newItemModel = {
      unit: '-1',
      supply: '-1',
      category: '-1',
      store: '-1',
    };
    this.loadItemCatories();
    this.loadMeasurementUnit();
    this.loadSupply();
    this.loadStore();
  }

  loadItemCatories() {
    this.lookupService.setSearchParams(this.searchParams);
    this.lookupService
      .getItemCategory(this.searchParams)
      .subscribe((response) => {
        this.itemCategories = response.result;
        this.pagination = response.pagination;
      });
  }

  loadMeasurementUnit() {
    this.lookupService.setSearchParams(this.searchParams);
    this.lookupService
      .getMeasurementUnit(this.searchParams)
      .subscribe((response) => {
        this.measurementUnit = response.result;
        this.pagination = response.pagination;
      });
  }

  loadSupply() {
    this.lookupService.setSearchParams(this.searchParams);
    this.lookupService.getSupply(this.searchParams).subscribe((response) => {
      this.supplies = response.result;
      this.pagination = response.pagination;
    });
  }

  loadStore() {
    this.lookupService.setSearchParams(this.searchParams);
    this.lookupService.getStores(this.searchParams).subscribe((response) => {
      this.stores = response.result;
      this.pagination = response.pagination;
    });
  }

  addUpdateItem() {
    
    this.itemsService.saveItem(this.newItemModel).subscribe((response) => {
  
    });

  }

  confirm() {
    this.result = true;
    this.addUpdateItem();
    this.bsModalRef.hide();
  }

  decline() {
    this.result = false;
    this.bsModalRef.hide();
  }
}
