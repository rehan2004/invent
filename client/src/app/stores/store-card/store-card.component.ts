import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Store } from 'src/app/_models/store';
import { StoresService } from 'src/app/_services/stores.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-store-card',
  templateUrl: './store-card.component.html',
  styleUrls: ['./store-card.component.css'],
})
export class StoreCardComponent implements OnInit {
  @Input() store: Store;

  constructor(private storeService: StoresService, private toastr: ToastrService, 
    public presence: PresenceService) { }

  ngOnInit(): void {
    //alert(JSON.stringify(this.store))
    
  }

  // addLike(store: Store) {
  //   this.storeService.addLike(store.username).subscribe(() => {
  //     this.toastr.success('You have liked ' + store.knownAs);
  //   })
  // }

}
