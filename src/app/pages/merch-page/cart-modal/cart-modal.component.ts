import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IMerchProduct } from '@interfaces/merch-item.interface';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MerchService } from '@services/merch.service';
import { CartForm, CartFormProduct } from '@pages/merch-page/utils/interfaces';
import { AddToCartParameter, OrderProduct } from '@interfaces/add-to-cart-request';
import { finalize, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { MerchActionType } from '@pages/merch-page/utils/merch-action-type';
import closeSvg from '!!raw-loader!@assets/images/close.svg';
import { ConfirmModalComponent } from '@andkit/components/modals/confirm-modal/confirm-modal.component';
import { CONFIRM_MODAL_WIDTH } from '@pages/piece-news-creation/piece-news-creation';

@Component({
  selector: 'andteam-order-item-details',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartModalComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public products: IMerchProduct[];
  public points: number;
  public totalPoints = 0;
  public reservedPoints = 0;
  public differenceBetweenPoints = 0;
  public actionType: MerchActionType;
  public canDeleteProduct: boolean;
  public buttonTypePrimary = BUTTON_TYPES.PRIMARY;
  public buttonTypeSecondary = BUTTON_TYPES.SECONDARY;
  public buttonTypeText = BUTTON_TYPES.TEXT;
  public isLoading = false;
  public closeIcon: string = closeSvg;
  public shouldReloadData = false;

  public get isOrder(): boolean {
    return this.actionType === MerchActionType.changeOrder;
  }

  private destroy$ = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) data: { products: IMerchProduct[], points: number, actionType: MerchActionType },
    public merchService: MerchService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialogRef: MatDialogRef<CartModalComponent>,
    private modalWindow: MatDialog,
  ) {
    this.products = data.products;
    this.points = data.points;
    this.actionType = data.actionType;

    if (data.actionType === MerchActionType.changeOrder) {
      this.reservedPoints = data.products[0].price;
    }

    this.canDeleteProduct = data.actionType !== MerchActionType.addToCart;
  }

  ngOnInit(): void {
    this.initializeForm();
    this.calculateDifferenceBetweenPoints();
    this.setTotalPoints();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getNameOfOrderButton(): string {
    let buttonName = '';

    switch (this.actionType) {
      case MerchActionType.changeOrder:
        buttonName = 'Save';
        break;
      case MerchActionType.addToCart:
        buttonName = 'Add to cart';
        break;
      case MerchActionType.applyOrder:
      default:
        buttonName = 'Order';
    }

    return buttonName;
  }

  public getModalTitle(): string {
    let title = '';

    switch (this.actionType) {
      case MerchActionType.changeOrder:
        title = 'Order card';
        break;
      case MerchActionType.addToCart:
        title = 'Item card';
        break;
      case MerchActionType.applyOrder:
      default:
        title = 'Shopping cart';
    }

    return title;
  }

  public getProductsFormArray(): FormArray {
    return this.form.get('products') as FormArray;
  }

  public onSubmit(): void {
    if (!this.isLoading) {
      this.isLoading = true;
      const products = this.transformFormDataToRequestData(this.form.value);
      const cartRequest$ = this.getRequestForSubmit(products, this.actionType);
      const isConfirmationNeededRequest$ = this.actionType === MerchActionType.applyOrder
        ? this.openConfirmModal()
        : of(true);

      isConfirmationNeededRequest$.pipe(
        switchMap((confirmed) => {
          const finalRequest: Observable<void | boolean> = confirmed ? cartRequest$ : of(false);

          return finalRequest
            .pipe(
              tap((result) => {
                if (confirmed) {
                  this.dialogRef.close(this.actionType);
                }
              }),
            );
        }),
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
          this.changeDetectorRef.markForCheck();
        }),
      )
        .subscribe();
    }
  }

  public onClose(): void {
    this.dialogRef.close(this.shouldReloadData);
  }

  public isEnoughPoints(): boolean {
    return this.isOrder
      ? this.totalPoints <= (this.points + this.reservedPoints)
      : this.totalPoints <= this.points;
  }

  public onDelete(product: IMerchProduct): void {
    this.merchService.deleteProduct(product.id)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.shouldReloadData = true;
        const deleteIndex = this.getProductsFormArray().controls
          .findIndex((control) => {
            return control.value.cartId === product.id;
          });

        if (deleteIndex !== -1) {
          (this.form.get('products') as FormArray).removeAt(deleteIndex);
          this.products.splice(deleteIndex, 1);
          this.changeDetectorRef.markForCheck();
        }
      });
  }

  private calculateDifferenceBetweenPoints(): void {
    this.differenceBetweenPoints = this.reservedPoints
      ? (this.totalPoints - this.reservedPoints)
      : 0;
  }

  private setTotalPoints(): void {
    this.form.get('products').valueChanges.pipe(
      takeUntil(this.destroy$),
    )
      .subscribe((products: CartFormProduct[]) => {
        this.totalPoints = products
          .reduce(
            (acc: number, product: CartFormProduct) => {
              const productTotalPrice = product ? product.quantity * product.price : 0;

              return acc + productTotalPrice;
            },
            0,
          );

        this.calculateDifferenceBetweenPoints();
        this.changeDetectorRef.detectChanges();
      });
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      products: new FormArray([]),
    });

    this.products.forEach((product) => {
      this.getProductsFormArray().push(new FormControl(null));
    });
  }

  private transformFormDataToRequestData(formData: CartForm): OrderProduct[] {
    return formData.products.map((product) => {
      const parameters: AddToCartParameter[] = Object.keys(product.parameters).map((paramKey) => {
        return {
          id: paramKey,
          parameterValueId: product.parameters[paramKey].id,
        };
      });

      const orderProduct = {
        itemId: product.productId,
        countItems: product.quantity,
        parametersId: parameters,
      };

      if (product.cartId && this.actionType !== MerchActionType.addToCart) {
        orderProduct['id'] = product.cartId;
      }

      return orderProduct;
    });
  }

  private getRequestForSubmit(products: OrderProduct[], actionType: MerchActionType): Observable<void> {
    let request: Observable<void>;

    switch (actionType) {
      case MerchActionType.addToCart:
        request = this.getRequestForAddToCart(products[0]);
        break;
      case MerchActionType.applyOrder:
        request = this.getRequestToApplyOrder(products);
        break;
      case MerchActionType.changeOrder:
      default:
        request = this.getRequestToChangeOrder(products);
    }

    return request;
  }

  private getRequestForAddToCart(product: OrderProduct): Observable<void> {
    return this.merchService.addToCart(product);
  }

  private getRequestToApplyOrder(products: OrderProduct[]): Observable<void> {
    return this.merchService.applyOrder(products);
  }

  private getRequestToChangeOrder(products: OrderProduct[]): Observable<void> {
    return this.merchService.changeOrder(products);
  }

  private openConfirmModal(): Observable<boolean> {
    return this.modalWindow.open(ConfirmModalComponent, {
      width: CONFIRM_MODAL_WIDTH,
      data: {
        titleText: 'Confirm your order?',
        subtitleText: `The item you have chosen costs ${this.totalPoints} points and they will be withdrawn from your account`,
        cancelBtnText: 'Cancel',
        confirmBtnText: 'Confirm',
        questionLogo: false,
      },
    })
      .afterClosed();
  }
}
