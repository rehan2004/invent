import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { AddItemDialogComponent } from '../modals/add-item-dialog/add-item-dialog.component';
import { InventoryDialogComponent } from '../modals/inventory-dialog/inventory-dialog.component';
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  bsModelRef: BsModalRef;
//new service push
  constructor(private modalService: BsModalService) { }

  confirm(title = 'Add New Items', 
    modalType='AddItemDialogComponent',
    data:any,
    message = 'Are you sure you want to do this?', 
    btnOkText = 'Save', 
    btnCancelText = 'Close'): Observable<boolean> {
      const config = {
         initialState: {
          title, 
          message,
          btnOkText,
          btnCancelText,
          data,
           
        },
        class:"modal-lg"
      }

      if (modalType==='AddItemDialogComponent')
      {
    this.bsModelRef = this.modalService.show(AddItemDialogComponent, config);
      }

      if (modalType==='InventoryDialogComponent')
      {
    this.bsModelRef = this.modalService.show(InventoryDialogComponent, config);
   
      }
    
    return new Observable<boolean>(this.getResult());
  }

  private getResult() {
    return (observer) => {
      const subscription = this.bsModelRef.onHidden.subscribe(() => {
        observer.next(this.bsModelRef.content.result);
        observer.complete();
      });

      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      }
    }
  }
}
