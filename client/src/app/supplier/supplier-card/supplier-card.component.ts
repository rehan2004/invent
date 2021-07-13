import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Supplier } from 'src/app/_models/supplier';
import { SuppliersService } from 'src/app/_services/suppliers.service';
import { PresenceService } from 'src/app/_services/presence.service';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-supplier-card',
  templateUrl: './supplier-card.component.html',
  styleUrls: ['./supplier-card.component.css'],
})
export class SupplierCardComponent implements OnInit {
  @Input() supplier: Supplier;

  constructor(private supplierService: SuppliersService, private toastr: ToastrService, 
    private modalService: ModalService,
    public presence: PresenceService) { }

  ngOnInit(): void {
    //alert(JSON.stringify(this.supplier))
    
  }

  
  openInvLogModal(supplier:Supplier) {
    this.modalService.confirm('Inventory Log', 'InventoryLogComponent', supplier,'').subscribe((result) => {
      if (result) {}
    });
  }

  openInventoryModal(supplier:Supplier) {
    this.modalService.confirm('Inventory Update', 'InventoryDialogComponent', supplier,'').subscribe((result) => {
      if (result) {}
    });
  }

  openSupplierEditModal(supplier: Supplier) {
    this.modalService.confirm('Edit Supplier', 'AddSupplierDialogComponent', supplier).subscribe((result) => {
      if (result) {
      }
    });
  }

}
