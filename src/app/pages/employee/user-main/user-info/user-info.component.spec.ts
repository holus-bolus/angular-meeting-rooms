import { IActivities } from '@interfaces/expert-activities.interface';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserInfoComponent } from './user-info.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TimezoneModule } from '@pipes/timezone/timezone.module';
import { LinkModule } from '@pipes/link/link.module';
import { BreadcrumbsModule } from '@andkit/components/other/breadcrumbs/breadcrumbs.module';
import { ExpertActivitiesService } from '@services/expert-activities.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICelebrationsButtons } from '@interfaces/send-card';
import { IUserInfo } from '@interfaces/userInfo.interface';
import { By } from '@angular/platform-browser';

const button = {
  celebrationId: 'CEL_ID',
  shortName: 'SHORT_NAME',
  defaultText: 'DEF_TEXT'
} as ICelebrationsButtons;

const activityMock: IActivities = {
  activityName: 'ACTIVITY_NAME',
  id: 'ACTIVITY_ID',
  isActive: true
};

const userInfoMock: IUserInfo = {
  externalId: 'EXTERNAL_ID',
  fullNameRu: 'Мойша Григорьевна',
  fullNameEn: '',
  birthDate: '2021-05-04T00:00:00',
  location: {
    id: '198f2146-877a-11e5-805b-0050569441cb',
    name: 'POLOTSK'
  },
  emailCorp: 't.userforhr@andersenlab.com',
  email: '',
  skype: '34534',
  mobilePhone: 'MOBILE_PHONE',
  isWork: true,
  nextAssessmentDate: '2021-06-17T00:00:00',
  photo: '',
  startDate: '2021-06-16T00:00:00',
  dayOff: [],
  position: 'HR',
  department: 'Administration',
  technologies: [],
  resourceManagerHierarchy: [
    {
      id: '1',
      name: 'First Rm',
      isWork: true
    },
    {
      id: '2',
      name: 'Second Rm',
      isWork: true
    },
    {
      id: '3',
      name: 'Third Rm',
      isWork: false
    }
  ],
  hrManager: null,
  languages: [
    {
      id: '3152ac34-c5c2-11ea-85e3-3497f65c56b3',
      name: 'English',
      level: 'A1'
    }
  ],
  extraMile: {
    isExtraMile: false,
    canEdit: false,
    comment: ''
  },
  roles: [],
  allocationsCurrent: [],
  allocationsPrevious: [],
  expertActivities: [],
  canEditExpertActivities: false,
  isHideBirthday: true,
  isHidePhone: true,
  level: 'LEVEL',
  vacations: [],
  vacation: {
    fromDate: '2021-08-02T00:00:00',
    toDate: '2021-08-27T00:00:00'
  }
};

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;
  let routerService;

  const expertActivitiesServiceMock = jasmine.createSpyObj('ExpertActivitiesService', ['updateExpertActivities']);
  expertActivitiesServiceMock.updateExpertActivities.and.returnValue(of(true));

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserInfoComponent],
      imports: [
        SafeHtmlModule,
        LinkModule,
        TimezoneModule,
        BreadcrumbsModule,
        RouterTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ExpertActivitiesService,
          useValue: expertActivitiesServiceMock
        },
        {
          provide: ActivatedRoute,
          useValue: {}
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    routerService = TestBed.inject(Router);
    component.userInfo = userInfoMock;
  });

  it('should create UserInfoComponent', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('goSalaryReviewTab should navigate to salary-review', () => {
    spyOn(routerService, 'navigate');

    component.goSalaryReviewTab();

    expect(routerService.navigate).toHaveBeenCalledWith([`..//salary-review`], jasmine.any(Object));
  });

  it('goToFeedbackPage should navigate to feedback', () => {
    spyOn(routerService, 'navigate');

    component.goToFeedbackPage();

    expect(routerService.navigate).toHaveBeenCalledWith([`..//feedback`], jasmine.any(Object));
  });

  it('goToOneToOnePage should navigate to one-to-one', () => {
    spyOn(routerService, 'navigate');

    component.goToOneToOnePage();

    expect(routerService.navigate).toHaveBeenCalledWith([`..//one-to-one`], jasmine.any(Object));
  });

  it('should display vacation', () => {
    fixture.detectChanges();

    const dateFrom = new Date(userInfoMock.vacation.fromDate).toLocaleDateString();
    const dateTo = new Date(userInfoMock.vacation.toDate).toLocaleDateString();
    const vacation = fixture.debugElement.queryAll((By.css('.links-text__date')));
    expect(vacation[0].nativeElement.textContent).toContain(`${dateFrom}`);
    expect(vacation[1].nativeElement.textContent).toContain(`${dateTo}`);

  });

  describe('openSurveyWindow', () => {
    it('should emit surveyResults', () => {
      spyOn(component.surveyResults, 'emit');

      component.openSurveyWindow(true);

      expect(component.surveyResults.emit).toHaveBeenCalledTimes(1);
    });

    it('should emit questionnaire', () => {
      spyOn(component.questionnaire, 'emit');

      component.openSurveyWindow(false);

      expect(component.questionnaire.emit).toHaveBeenCalledTimes(1);
    });
  });

  it('openEventSendWindow should emit buttonId', () => {
    spyOn(component.buttonId, 'emit');

    component.openEventSendWindow(button);

    expect(component.buttonId.emit).toHaveBeenCalledOnceWith(button);
  });

  it('onFadeOut should emit isActivitiesUpdate$ with false', () => {
    spyOn(component.isActivitiesUpdate$, 'next');

    component.onFadeOut();

    expect(component.isActivitiesUpdate$.next).toHaveBeenCalledOnceWith(false);
  });

  it('breadcrumbsList should mutate resourceManagerHierarchy', () => {
    fixture.detectChanges();

    const breadcrumbs = component.breadcrumbsList;

    expect(breadcrumbs).toEqual(jasmine.any(Array));
    expect(breadcrumbs.length).toBe(3);
    expect(breadcrumbs[0].link).toEqual(['/employee', '1']);
  });

  describe('updateExpertActivities', () => {
    beforeEach(() => {
      userInfoMock.expertActivities = [];
    });

    it('should call expertActivitiesService.updateExpertActivities', () => {
      const service = TestBed.inject(ExpertActivitiesService);

      component.updateExpertActivities([{ ...activityMock }]);

      expect(service.updateExpertActivities).toHaveBeenCalledWith(['ACTIVITY_ID'], 'EXTERNAL_ID');
    });

    it('should set expert activities to userInfo', () => {
      expect(component.userInfo.expertActivities.length).toBe(0);

      component.updateExpertActivities([{ ...activityMock }]);

      expect(component.userInfo.expertActivities.length).toBe(1);
      expect(component.userInfo.expertActivities).toEqual([{ ...activityMock }]);
    });

    it('should emit isActivitiesUpdate$ true', () => {
      spyOn(component.isActivitiesUpdate$, 'next');

      component.updateExpertActivities([{ ...activityMock }]);

      expect(component.isActivitiesUpdate$.next).toHaveBeenCalledOnceWith(true);
    });
  });
});
