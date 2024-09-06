import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';

import trashTransparentSvg from '!!raw-loader!@assets/images/trash-transparent.svg';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IMerchProduct, IMerchProductParameter } from '@interfaces/merch-item.interface';
import { ICommonOption } from '@interfaces/filter';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MerchActionType } from '@pages/merch-page/utils/merch-action-type';

@Component({
  selector: 'andteam-order-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CartProductComponent),
      multi: true,
    },
  ],
})
export class CartProductComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {

  @Input() public product: IMerchProduct;
  @Input() public points: number;
  @Input() public canDelete = false;
  @Input() public actionType: MerchActionType;

  @Output() public delete = new EventEmitter<IMerchProduct>();

  public form: FormGroup;
  public buttonType = BUTTON_TYPES;
  public trashIcon = trashTransparentSvg;
  public colors: string[] = [];
  public parameterOptions: { [key: string]: ICommonOption[] } = {};

  public get isOrder(): boolean {
    return this.actionType === MerchActionType.changeOrder;
  }

  public get isAddToCart(): boolean {
    return this.actionType === MerchActionType.addToCart;
  }

  public get productPrice(): number {
    return (this.isOrder || this.isAddToCart)
      ? this.form.get('price').value
      : (this.form.get('price').value * this.form.get('quantity').value);
  }

  private onTouched: (value: string) => void;
  private onChange: (value: string) => void;
  private destroy$ = new Subject<void>();

  constructor() {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.subscribeValueChanges();
  }

  ngAfterViewInit(): void {
    this.onChange(this.form.value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue(value: ICommonOption): void {
  }

  public getParametersGroup(): FormGroup {
    return this.form.get('parameters') as FormGroup;
  }

  public getParameterControlById(parameterId: string): FormControl {
    return this.getParametersGroup().get(parameterId) as FormControl;
  }

  public getOptionsForSelect(parameterId: string): ICommonOption[] {
    return this.parameterOptions[parameterId];
  }

  public onDelete(): void {
    this.delete.next(this.product);
  }

  private initializeForm(): void {
    const productId = this.actionType === MerchActionType.addToCart
      ? this.product.id
      : this.product.itemId;
    const quantity = this.product.countItems || 1;
    const price = this.product.price / quantity;

    this.form = new FormGroup({
      productId: new FormControl(productId),
      quantity: new FormControl(quantity),
      parameters: new FormGroup({}),
      cartId: new FormControl(this.product.id),
      price: new FormControl(price),
    });

    this.product?.parameters.forEach((parameter) => {
      this.setParameterOptions(parameter);
      const selectedValue = this.product.selectedParameterValuesId
        ?.find(param => param.id === parameter.id)
        ?.parameterValueId;
      const selectedParameterId = Object.keys(this.parameterOptions).find(paramKey => paramKey === parameter.id);
      const selectedOption = this.parameterOptions[selectedParameterId].find(option => option.id === selectedValue);
      const defaultOption = this.parameterOptions[parameter.id][0];

      (this.form.get('parameters') as FormGroup).addControl(
        parameter.id,
        new FormControl(selectedOption || defaultOption),
      );
    });
  }

  private subscribeValueChanges(): void {
    this.form.valueChanges.pipe(
      takeUntil(this.destroy$),
    )
      .subscribe((formValue) => {
        this.onChange(formValue);
      });
  }

  private setParameterOptions(parameter: IMerchProductParameter): void {
    this.parameterOptions[parameter.id] = parameter.parameterValues.map((paramValue) => {
      return {
        id: paramValue.id,
        name: paramValue.value,
        value: paramValue.value,
      };
    });
  }
}
