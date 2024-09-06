import { By } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { PhoneNumberModule } from '@pipes/phone-number/phone-number.module';
import { LinkModule } from '@pipes/link/link.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { IUserInfo, ITechnologies, IUserRole } from '@interfaces/userInfo.interface';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '@services/user.service';
import { UserSkillsAndContactsComponent } from './user-skills-and-contacts.component';

const technologyMock: ITechnologies = {
  id: 'TECHNOLOGY_ID',
  name: 'TECHNOLOGY_NAME',
  level: 'TECHNOLOGY_LEVEL',
  main: true,
  linkMatrix: 'TECHNOLOGY_LINK'
};

const roleMock: IUserRole = {
  id: 'USER_ROLE_ID',
  name: 'USER_ROLE_NAME'
};

const userInfoMock: IUserInfo = {
  externalId: 'e9ba0cc1-c9d1-11eb-8610-4c52621df2b2',
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
      id: 'd001949f-e72f-11e3-b804-0050569441cb',
      name: 'First Rm',
      isWork: true
    },
    {
      id: '2794d28b-137c-11e6-9132-00155d9c500d',
      name: 'Second Rm',
      isWork: true
    },
    {
      id: '7c88396d-260d-11ea-81d7-00155d9c500d',
      name: 'Third Rm',
      isWork: false
    }
  ],
  hrManager: {
    id: 'f84e9025-28cd-11eb-85e2-0c9d92c3d39d',
    name: 'Hr Manager',
    isWork: true
  },
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
  expertActivities: [
    {
      id: '830fc60a-f915-42c9-8317-2d5d3133adaa',
      activityName: 'Mentoring',
      isActive: false
    },
    {
      id: '6d3b90b9-00ed-4264-9cfb-fcedb049246e',
      activityName: 'Technical Interview',
      isActive: false
    },
    {
      id: '565d80fb-8742-4610-ad79-3081e5171d70',
      activityName: 'Project Estimation',
      isActive: false
    },
    {
      id: '37125a9a-5fd1-4e99-aa88-20f71d2736d4',
      activityName: 'Technical Task Implementation',
      isActive: false
    },
    {
      id: 'd7e74089-b384-437a-822a-66e3872d453c',
      activityName: 'Demo Interview',
      isActive: false
    },
    {
      id: 'e7c64316-c556-40d7-b58d-6ecabb91db58',
      activityName: 'Service Presentation',
      isActive: false
    }
  ],
  canEditExpertActivities: false,
  isHideBirthday: true,
  isHidePhone: true,
  level: 'LEVEL',
  vacations: []
};

describe('UserSkillsAndContactsComponent', () => {
  let component: UserSkillsAndContactsComponent;
  let fixture: ComponentFixture<UserSkillsAndContactsComponent>;

  const userServiceMock = jasmine.createSpyObj('UserService', ['setHiddensBirthdayAndPhone']);
  userServiceMock.setHiddensBirthdayAndPhone.and.returnValue(of(true));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSkillsAndContactsComponent],
      imports: [SafeHtmlModule, LinkModule, PhoneNumberModule],
      providers: [
        { provide: UserService, useValue: userServiceMock }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSkillsAndContactsComponent);
    component = fixture.componentInstance;

    component.userInfo = userInfoMock;
    component.currentUserId = 'CURRENT_USER_ID';
  });

  afterEach(() => fixture.destroy());

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should init hiddenBirthdayControl', () => {
      component.hiddenBirthdayControl = null;
      expect(component.hiddenBirthdayControl).toBe(null);

      fixture.detectChanges();
      expect(component.hiddenBirthdayControl).toEqual(jasmine.any(FormControl));
    });

    it('should init hiddenPhoneControl', () => {
      component.hiddenPhoneControl = null;
      expect(component.hiddenPhoneControl).toBe(null);

      fixture.detectChanges();
      expect(component.hiddenPhoneControl).toEqual(jasmine.any(FormControl));
    });

    it('should call userService.setHiddensBirthdayAndPhone when hiddenBirthdayControl changed', () => {
      const service = TestBed.inject(UserService);

      fixture.detectChanges();
      component.hiddenBirthdayControl.patchValue(true);

      expect(service.setHiddensBirthdayAndPhone).toHaveBeenCalledWith({ hideBirthday: true });
    });

    it('should call userService.setHiddensBirthdayAndPhone when hiddenPhoneControl changed', () => {
      const service = TestBed.inject(UserService);

      fixture.detectChanges();
      component.hiddenPhoneControl.patchValue(true);

      expect(service.setHiddensBirthdayAndPhone).toHaveBeenCalledWith({ hidePhone: true });
    });
  });

  describe('user skills', () => {
    afterEach(() => {
      userInfoMock.technologies = [];
      userInfoMock.roles = [];
    });

    it('should display Position HR', () => {
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('[automation-id="position-inline-info"] .title'));
      const text = fixture.debugElement.query(By.css('[automation-id="position-inline-info"] .text'));

      expect(title.nativeElement.textContent).toBe('Position');
      expect(text.nativeElement.textContent).toBe('HR');
    });

    it('should display Department Administration', () => {
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('[automation-id="department-inline-info"] .title'));
      const text = fixture.debugElement.query(By.css('[automation-id="department-inline-info"] .text'));

      expect(title.nativeElement.textContent).toBe('Department');
      expect(text.nativeElement.textContent).toBe('Administration');
    });

    it('should display Hiring date 16.06.2021', () => {
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('[automation-id="hiring-date-inline-info"] .title'));
      const text = fixture.debugElement.query(By.css('[automation-id="hiring-date-inline-info"] .text'));

      expect(title.nativeElement.textContent).toBe('Hiring date');
      expect(text.nativeElement.textContent).toBe('16.06.2021');
    });

    it('should not display technologies', () => {
      fixture.detectChanges();

      const chip = fixture.debugElement.query(By.css('.chips-text-technologies'));

      expect(chip).toBeFalsy();
    });

    it('should display technology TECHNOLOGY_NAME / TECHNOLOGY_LEVEL', () => {
      userInfoMock.technologies = [technologyMock];
      fixture.detectChanges();

      const chip = fixture.debugElement.query(By.css('.chips-text-technologies'));

      expect(chip.nativeElement.textContent).toBe('TECHNOLOGY_NAME / TECHNOLOGY_LEVEL');
    });

    it('should display Roles None', () => {
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('[automation-id="roles-inline-info"] .title'));
      const text = fixture.debugElement.query(By.css('[automation-id="roles-inline-info"] .text'));

      expect(title.nativeElement.textContent).toBe('Roles');
      expect(text.nativeElement.textContent).toBe('None');
    });

    it('should display Roles USER_ROLE_NAME', () => {
      userInfoMock.roles = [roleMock];
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('[automation-id="roles-inline-info"] .title'));
      const text = fixture.debugElement.query(By.css('[automation-id="roles-inline-info"] .chips-text'));

      expect(title.nativeElement.textContent).toBe('Roles');
      expect(text.nativeElement.textContent.trim()).toBe('USER_ROLE_NAME');
    });

    it('should display Languages English / A1', () => {
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('[automation-id="languages-info-inline"] .title'));
      const text = fixture.debugElement.query(By.css('[automation-id="languages-info-inline"] .chips-text'));

      expect(title.nativeElement.textContent).toBe('Languages');
      expect(text.nativeElement.textContent.trim()).toBe('English / A1');
    });

    it('should display Date of birth 04.05.2021', () => {
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('[automation-id="bday-info-inline"] .title'));
      const text = fixture.debugElement.query(By.css('[automation-id="bday-info-inline"] .text'));

      expect(title.nativeElement.textContent).toBe('Date of birth');
      expect(text.nativeElement.textContent.trim()).toBe('04.05.2021');
    });
  });

  describe('contacts', () => {
    it('should display HR Hr Manager', () => {
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('[automation-id="hr-info-inline"] .title'));
      const text = fixture.debugElement.query(By.css('[automation-id="hr-info-inline"] .info-link-dotted'));

      expect(title.nativeElement.textContent).toBe('HR');
      expect(text.nativeElement.textContent.trim()).toBe('Hr Manager');
    });

    it('should display Location POLOTSK', () => {
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('[automation-id="location-info-inline"] .title'));
      const text = fixture.debugElement.query(By.css('[automation-id="location-info-inline"] .text'));

      expect(title.nativeElement.textContent).toBe('Location');
      expect(text.nativeElement.textContent.trim()).toBe('POLOTSK');
    });

    it('should display E-mail t.userforhr@andersenlab.com', () => {
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('[automation-id="email-info-inline"] .title'));
      const text = fixture.debugElement.query(By.css('[automation-id="email-info-inline"] .info-link-dotted'));

      expect(title.nativeElement.textContent).toBe('E-mail');
      expect(text.nativeElement.textContent.trim()).toBe('t.userforhr@andersenlab.com');
    });

    it('should display Skype 34534', () => {
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('[automation-id="skype-info-inline"] .title'));
      const text = fixture.debugElement.query(By.css('[automation-id="skype-info-inline"] .info-link-dotted'));

      expect(title.nativeElement.textContent).toBe('Skype');
      expect(text.nativeElement.textContent.trim()).toBe('34534');
    });

    it('should display Phone number MOBILE_PHONE', () => {
      fixture.detectChanges();

      const title = fixture.debugElement.query(By.css('[automation-id="phone-info-inline"] .title'));
      const text = fixture.debugElement.query(By.css('[automation-id="phone-info-inline"] .text'));

      expect(title.nativeElement.textContent).toBe('Phone number');
      expect(text.nativeElement.textContent.trim()).toBe('MOBILE_PHONE');
    });
  });
});
