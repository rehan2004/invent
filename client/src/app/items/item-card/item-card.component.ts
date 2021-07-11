import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/_models/item';
import { ItemsService } from 'src/app/_services/items.service';
import { PresenceService } from 'src/app/_services/presence.service';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css'],
})
export class ItemCardComponent implements OnInit {
  @Input() item: Item;

  constructor(private itemService: ItemsService, private toastr: ToastrService, 
    private modalService: ModalService,
    public presence: PresenceService) { }

  ngOnInit(): void {
    //alert(JSON.stringify(this.item))
    
  }

  
  openInvLogModal(item:Item) {
    this.modalService.confirm('Inventory Log', 'InventoryLogComponent', item,'').subscribe((result) => {
      if (result) {}
    });
  }

  openInventoryModal(item:Item) {
    this.modalService.confirm('Inventory Update', 'InventoryDialogComponent', item,'').subscribe((result) => {
      if (result) {}
    });
  }

  openItemEditModal(item: Item) {
    this.modalService.confirm('Edit Item', 'AddItemDialogComponent', item).subscribe((result) => {
      if (result) {
      }
    });
  }

}
