import { Component, OnInit,ViewChild, HostListener  } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { LookupService } from 'src/app/_services/lookup.service';
import { SearchParams } from 'src/app/_models/searchParams';
import { ItemCategory } from 'src/app/_models/itemcategory';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.css']
})
export class AddItemDialogComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  title: string;
  message: string;
  btnOkText: string;
  btnCancelText: string;
  result: boolean;
  searchParams: SearchParams;
  itemCategories: ItemCategory[];
  pagination: Pagination;

  user: User;

  constructor(public bsModalRef: BsModalRef,private lookupService: LookupService, private toastr: ToastrService, ) {
    this.searchParams = this.lookupService.getSearchParams();
   }

  ngOnInit(): void {
    this.loadItemCatories();
  }

  loadItemCatories() {
    this.lookupService.setSearchParams(this.searchParams);
    this.lookupService.getItemCategory(this.searchParams).subscribe(response => {
      this.itemCategories = response.result;
      this.pagination = response.pagination;
    })
  }

  addUpdateItem()
  {

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
