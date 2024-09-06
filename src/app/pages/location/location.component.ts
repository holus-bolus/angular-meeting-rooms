import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LocationService } from '@services/location.service';
import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { ILocation } from '@interfaces/location.interface';
import { MatDialog } from '@angular/material/dialog';
import { LocationModalComponent } from '@pages/location/location-modal/location-modal.component';

import locationMarkerSvg from '!!raw-loader!@assets/images/locationMarker.svg';

@Component({
  selector: 'andteam-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationComponent implements OnInit, OnDestroy {
  public locationMarkerSvgIcon = locationMarkerSvg;
  public location = new BehaviorSubject<ILocation>(null);

  private destroy$ = new Subject();

  constructor(
    private locationService: LocationService,
    private modalWindow: MatDialog,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getCurrentLocation();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onModalOpen(): void {
    const modalWindow = this.modalWindow.open(LocationModalComponent, {
      width: '480px',
      data: {
        location: this.location.value,
      },
      autoFocus: false,
    });

    modalWindow.componentInstance.confirmEvent.pipe(
      takeUntil(this.destroy$))
      .subscribe(() => {
        this.getCurrentLocation();
      });
  }

  private getCurrentLocation(): void {
    this.locationService.getCurrentLocation().pipe(
      takeUntil(this.destroy$),
    ).subscribe((location: ILocation) => {
      this.location.next(location);
      this.cdr.detectChanges();
    });
  }

}
