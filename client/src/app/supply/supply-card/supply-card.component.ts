import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Supply } from 'src/app/_models/supply';
import { SupplyService } from 'src/app/_services/supply.service';
import { PresenceService } from 'src/app/_services/presence.service';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-supply-card',
  templateUrl: './supply-card.component.html',
  styleUrls: ['./supply-card.component.css'],
})
export class SupplyCardComponent implements OnInit {
  @Input() supply: Supply;

  constructor(private supplyService: SupplyService, private toastr: ToastrService, 
    private modalService: ModalService,
    public presence: PresenceService) { }

  ngOnInit(): void {
    //alert(JSON.stringify(this.supply))
    
  }

  
  openInvLogModal(supply:Supply) {
    this.modalService.confirm('Inventory Log', 'InventoryLogComponent', supply,'').subscribe((result) => {
      if (result) {}
    });
  }

  openInventoryModal(supply:Supply) {
    this.modalService.confirm('Inventory Update', 'InventoryDialogComponent', supply,'').subscribe((result) => {
      if (result) {}
    });
  }

  openSupplyEditModal(supply: Supply) {
    this.modalService.confirm('Edit Supply', 'AddSupplyDialogComponent', supply).subscribe((result) => {
      if (result) {
      }
    });
  }

}
