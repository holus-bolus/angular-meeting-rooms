import { ExpertActivitiesModalComponent } from '@pages/expert-activities/expert-activities-modal/expert-activities-modal.component';
import { IActivities } from '@interfaces/expert-activities.interface';
import { of } from 'rxjs';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

import { UserExpertActivitiesComponent } from './user-expert-activities.component';

const modalWindowMock = {
  open: () => ({
    componentInstance: {
      checkedActivities: of({})
    }
  })
};

const activityMock: IActivities = {
  activityName: 'ACTIVITY_NAME',
  id: 'ACTIVITY_ID',
  isActive: true
};

describe('UserExpertActivitiesComponent', () => {
  let component: UserExpertActivitiesComponent;
  let fixture: ComponentFixture<UserExpertActivitiesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserExpertActivitiesComponent],
      imports: [SafeHtmlModule],
      providers: [
        { provide: MatDialog, useValue: modalWindowMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserExpertActivitiesComponent);
    component = fixture.componentInstance;
    component.expertActivities = [{ ...activityMock }];
  });

  it('should create UserExpertActivitiesComponent', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should call setupActivitiesOrder', () => {
    spyOn<any>(component, 'setupActivitiesOrder');

    fixture.detectChanges();

    expect(component['setupActivitiesOrder']).toHaveBeenCalledTimes(1);
  });

  describe('editActivitiesModal', () => {
    it('should open modal window', () => {
      const modal = TestBed.inject(MatDialog);
      spyOn(modal, 'open').and.callThrough();

      component.editActivitiesModal([]);

      expect(modal.open).toHaveBeenCalledOnceWith(ExpertActivitiesModalComponent, jasmine.any(Object));
    });

    it('should emit editedActivities', () => {
      spyOn(component.editedActivitiesEmit, 'emit');

      component.editActivitiesModal([]);

      expect(component.editedActivitiesEmit.emit).toHaveBeenCalledOnceWith(jasmine.any(Object));
    });
  });

});
