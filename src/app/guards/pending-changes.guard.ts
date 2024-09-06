import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '@andkit/components/modals/confirm-modal/confirm-modal.component';
import { CONFIRMATION_MODAL_DATA } from '@pages/employee/planned-vacations/planned-vacations.const';
import { FormGroup } from '@angular/forms';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean> | void;
  currentForm: FormGroup;
}

@Injectable()
export class PendingChangesGuard implements CanDeactivate<ComponentCanDeactivate> {

  constructor(
    private modalWindow: MatDialog
  ) {}

  canDeactivate(component: ComponentCanDeactivate): any  {
    if (component.currentForm.dirty) {
      return this.openConfirmationModal();
    }

    return of(true);
  }

  public openConfirmationModal(): Observable<boolean> {
    const confirmDialog = this.modalWindow.open(ConfirmModalComponent, {
      height: '346px',
      width: '496px',
      data: CONFIRMATION_MODAL_DATA,
      panelClass: 'confirm-for-route'
    });

    return confirmDialog.afterClosed();
  }
}
