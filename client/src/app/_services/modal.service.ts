import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { AddItemDialogComponent } from '../modals/add-item-dialog/add-item-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  bsModelRef: BsModalRef;
//new service push
  constructor(private modalService: BsModalService) { }

  confirm(title = 'Add New Items', 
    message = 'Are you sure you want to do this?', 
    btnOkText = 'Save', 
    btnCancelText = 'Close'): Observable<boolean> {
      const config = {
        initialState: {
          title, 
          message,
          btnOkText,
          btnCancelText,
           
        },
        class:"modal-lg"
      }
    this.bsModelRef = this.modalService.show(AddItemDialogComponent, config);
    
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
