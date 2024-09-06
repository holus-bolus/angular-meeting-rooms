import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ILocation } from '@interfaces/location.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMPONENT_TYPES } from '@constants/types/componentTypes.constants';
import { Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { INITIAL_DELAY } from '@andkit/components/other/loader/loader';
import { LocationService } from '@services/location.service';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import { ICommonOption } from '@interfaces/filter';
import { ConfirmModalComponent } from '@andkit/components/modals/confirm-modal/confirm-modal.component';
import { CONFIRM_MODAL_HEIGHT, CONFIRM_MODAL_WIDTH } from '@pages/employee/certificate/certificate.const';

@Component({
  selector: 'andteam-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationModalComponent implements OnInit {
  @Output() confirmEvent = new EventEmitter<void>();

  public componentsType = COMPONENT_TYPES.OVERTIME;
  public buttonType = BUTTON_TYPES;
  public formGroup: FormGroup;
  public options: any;
  public selectedCountry: ICommonOption;
  public selectedCity: ICommonOption;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      location: ILocation
    },

    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private modalWindow: MatDialog,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.initOptions();
    this.setupCurrentLocation();
  }

  public initForm(): void {
    this.formGroup = this.formBuilder.group({
      countryControl: ['', Validators.required],
      cityControl: ['', Validators.required],
    });

    this.formGroup.controls.cityControl.disable();
  }

  public initOptions(): void {
    this.options = {
      country$: this.getCountryOptions$(),
      city$: this.getCityOptions$(),
    };
  }

  public onCountryReset($event: ICommonOption): void {
    this.onCityReset();
    this.formGroup.controls.cityControl.disable();
  }

  public onSelectCountry($event: ICommonOption): void {
    this.selectedCountry = $event;
    this.formGroup.controls.cityControl.enable();
    this.onCityReset();
  }

  public onCountryClick(): void {
    this.formGroup.controls.countryControl.updateValueAndValidity({ onlySelf: false, emitEvent: true });
  }

  public onSelectCity($event: ICommonOption): void {
    this.selectedCity = $event;
  }

  public onCityClick(): void {
    if (this.selectedCountry) {
      this.formGroup.controls.cityControl.updateValueAndValidity({ onlySelf: false, emitEvent: true });
    }
  }

  public onCityReset(): void {
    this.formGroup.controls.cityControl.setValue('');
    this.selectedCity = null;
  }

  public onCancel(): void {
    const confirmDialog = this.modalWindow.open(ConfirmModalComponent, {
      data: {
        titleText: 'Are you sure you want to cancel adding your current location?',
        confirmBtnText: 'Yes',
        cancelBtnText: 'No',
      },
      width: CONFIRM_MODAL_WIDTH,
      height: CONFIRM_MODAL_HEIGHT,
    });


    confirmDialog.componentInstance.confirmEvent.subscribe(() => {
      this.modalWindow.closeAll();
    });

    confirmDialog.componentInstance.cancelEvent.subscribe(() => {
      confirmDialog.close();
    });
  }

  public onSubmit(): void {
    this.locationService.updateLocation(this.selectedCity.id,  this.selectedCity.name).subscribe(() => {
      this.confirmEvent.emit();
      this.modalWindow.closeAll();
    });
  }

  private setupCurrentLocation(): void {
    if (this.data.location) {
      this.selectedCountry = {
        id: this.data.location.countryId,
        name: this.data.location.countryTitle,
      };

      this.selectedCity = {
        id: this.data.location.cityId,
        name: this.data.location.cityTitle,
      };

      this.formGroup.controls.cityControl.enable();

      this.formGroup.controls.countryControl.setValue(this.selectedCountry.name);
      this.formGroup.controls.cityControl.setValue(this.selectedCity.name);
    }
  }


  private getCountryOptions$(): Observable<any> {
    return this.formGroup.controls.countryControl.valueChanges.pipe(
      debounceTime(INITIAL_DELAY),
      switchMap((countryNameSample: string) => {
        return countryNameSample?.length >= 1
          ? this.locationService.getCountry(
            countryNameSample,
          )
          : this.locationService.getAllCountries();
      })
    );
  }

  private getCityOptions$(): Observable<any> {
    return this.formGroup.controls.cityControl.valueChanges.pipe(
      debounceTime(INITIAL_DELAY),
      switchMap((cityNameSample: string) => {
        return cityNameSample?.length >= 1
          ? this.locationService.getCity(
            cityNameSample,
            this.selectedCountry.id,
          )
          : this.locationService.getAllCityByCountryId(this.selectedCountry.id);
      })
    );
  }

}
