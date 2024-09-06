import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tableHeaders } from '@pages/merch-page/my-orders/utils/table-header';
import { MerchService } from '@services/merch.service';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { Order } from '@pages/merch-page/my-orders/utils/order';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import trashTransparentSvg from '!!raw-loader!@assets/images/trash-transparent.svg';
import editSvg from '!!raw-loader!@assets/images/edit.svg';
import { IMerchProduct } from '@interfaces/merch-item.interface';
import { MerchActionType } from '@pages/merch-page/utils/merch-action-type';
import { CartModalComponent } from '@pages/merch-page/cart-modal/cart-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '@andkit/components/modals/confirm-modal/confirm-modal.component';
import { CONFIRM_MODAL_WIDTH } from '@pages/piece-news-creation/piece-news-creation';
import { OrderStatusType } from '@pages/merch-page/my-orders/utils/order-status-type';

@Component({
  selector: 'andteam-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyOrdersComponent implements OnInit, OnDestroy {

  public tableHeaders = tableHeaders;
  public buttonType = BUTTON_TYPES;
  public columns = tableHeaders.map(header => header.definition);
  public dataSource: Order[] = [];
  public trashIcon = trashTransparentSvg;
  public editIcon = editSvg;

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private merchService: MerchService,
    private changeDetectorRef: ChangeDetectorRef,
    private modalWindow: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public isActionsAvailable(status: OrderStatusType): boolean {
    return status === OrderStatusType.Active;
  }

  public getParameters(parameters: string): string {
    return parameters.replace(/\\r\\n/gm, '<br>');
  }

  public goBack(): void {
    this.router.navigate(['merch']);
  }

  public onDelete(orderId: string, status: OrderStatusType): void {
    if (!this.isActionsAvailable(status)) {
      return;
    }

    this.openConfirmModal()
      .pipe(
        switchMap((confirmed) => {
          const deleteRequest = this.merchService.deleteProduct(orderId)
            .pipe(
              tap(() => {
                this.loadOrders();
              })
            );

          return confirmed
            ? deleteRequest
            : of(null);
        })
      )
      .pipe(
        take(1),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  public onEdit(orderId: string, status: OrderStatusType): void {
    if (!this.isActionsAvailable(status)) {
      return;
    }

    combineLatest([
      this.merchService.getUserPoints(),
      this.merchService.getOrder(orderId),
    ])
      .pipe(
        take(1),
        takeUntil(this.destroy$)
      )
      .subscribe(([pointsResponse, merchProduct]) => {
        this.openCartModal(merchProduct, MerchActionType.changeOrder, pointsResponse.points);
      });
  }

  private loadOrders(): void {
    this.merchService.getMyOrders()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((response) => {
        this.dataSource = response;
        this.changeDetectorRef.markForCheck();
      });
  }

  private openCartModal(product: IMerchProduct, actionType: MerchActionType, points: number): void {
    this.modalWindow.open(CartModalComponent, {
      height: 'auto',
      width: '1061px',
      disableClose: true,
      panelClass: 'cart-modal-container',
      data: {
        actionType,
        points,
        products: [product],
      },
    })
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((isReloadNeeds) => {
        if (isReloadNeeds) {
          this.loadOrders();
        }
      });
  }

  private openConfirmModal(): Observable<boolean> {
    return this.modalWindow.open(ConfirmModalComponent, {
      width: CONFIRM_MODAL_WIDTH,
      data: {
        titleText: 'Are you sure you want to delete this item?',
        subtitleText: '',
        cancelBtnText: 'No',
        confirmBtnText: 'Yes',
        questionLogo: false,
      },
    })
      .afterClosed();
  }
}
