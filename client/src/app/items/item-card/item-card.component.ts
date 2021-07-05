import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/_models/item';
import { ItemsService } from 'src/app/_services/items.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css'],
})
export class ItemCardComponent implements OnInit {
  @Input() item: Item;

  constructor(private itemService: ItemsService, private toastr: ToastrService, 
    public presence: PresenceService) { }

  ngOnInit(): void {
    //alert(JSON.stringify(this.item))
    
  }

  // addLike(item: Item) {
  //   this.itemService.addLike(item.username).subscribe(() => {
  //     this.toastr.success('You have liked ' + item.knownAs);
  //   })
  // }

}
