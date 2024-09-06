import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { MerchService } from '@services/merch.service';
import { IMerchProduct } from '@interfaces/merch-item.interface';
import { CartModalComponent } from '@pages/merch-page/cart-modal/cart-modal.component';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import { Router } from '@angular/router';
import { MerchActionType } from '@pages/merch-page/utils/merch-action-type';

@Component({
  selector: 'andteam-merch',
  templateUrl: './merch.component.html',
  styleUrls: ['./merch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchComponent implements OnInit, AfterViewInit, OnDestroy {

  public userPoints: number;
  public myOrdersButtonType = BUTTON_TYPES.SECONDARY;
  public isShowToastNotification$ = new BehaviorSubject(false);
  public products: IMerchProduct[] = [];
  public productsInCart: IMerchProduct[] = [];
  public cartButtonMargin = null;

  @ViewChild('catalogElement') private catalogElement: ElementRef;
  @ViewChild('wrapperElement') private wrapperElement: ElementRef;

  private destroy$ = new Subject();

  constructor(
    public merchService: MerchService,
    public changeDetectorRef: ChangeDetectorRef,
    private modalWindow: MatDialog,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getUserPoints();
    this.getMyCart();
    this.initializeProducts();
  }

  ngAfterViewInit(): void {
    const catalogElement: HTMLDivElement = this.catalogElement.nativeElement;
    const wrapperElement: HTMLDivElement = this.wrapperElement.nativeElement;
    const buttonMargin = 10;
    this.cartButtonMargin = ((wrapperElement.clientWidth - catalogElement.clientWidth) / 2) + buttonMargin;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onChoseItem(product: IMerchProduct): void {
    this.openCartModal([product], MerchActionType.addToCart);
  }

  public onOpenCart(): void {
    this.openCartModal(this.productsInCart, MerchActionType.applyOrder);
  }

  public onFadeOut(): void {
    this.isShowToastNotification$.next(false);
  }

  public isParameterColor(parameterName: string): boolean {
    const name = parameterName?.toLocaleLowerCase();

    return name === 'color' || name === 'colors';
  }

  public onNavigationToOrders(): void {
    this.router.navigate(['merch/orders']);
  }

  private getUserPoints(): void {
    this.merchService.getUserPoints()
      .pipe(takeUntil(this.destroy$))
      .subscribe((pointsResponse) => {
        this.userPoints = pointsResponse?.points;
        this.changeDetectorRef.detectChanges();
      });
  }

  private getMyCart(): void {
    this.merchService.getMyCart()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((response) => {
        this.productsInCart = response;
        this.changeDetectorRef.markForCheck();
      });
  }

  private initializeProducts(): void {
    this.merchService.getProducts().pipe(
      takeUntil(this.destroy$),
      take(1),
    )
      .subscribe((response: IMerchProduct[]) => {
        this.products = response;
        this.changeDetectorRef.markForCheck();
      });
  }

  private openCartModal(products: IMerchProduct[], actionType: MerchActionType): void {
    this.modalWindow.open(CartModalComponent, {
      height: 'auto',
      width: '1061px',
      disableClose: true,
      panelClass: 'cart-modal-container',
      data: {
        actionType,
        products,
        points: this.userPoints,
      },
    })
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((typeOfAction) => {
        if (typeOfAction) {
          this.getUserPoints();
          this.getMyCart();
        }

        if (typeOfAction === MerchActionType.applyOrder) {
          this.isShowToastNotification$.next(true);
        }
      });
  }
}
