import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HrInterviewService } from '@services/hr-interview.service';
import { UserService } from '@services/user.service';
import { of } from 'rxjs';
import { HrInterviewComponent } from './hr-interview.component';
import { MOCK_HR_INTERVIEW_LIST } from './hr-interview.const';

describe('HrInterviewComponent', () => {
  let component: HrInterviewComponent;
  let fixture: ComponentFixture<HrInterviewComponent>;
  let userService: UserService;
  let hrInterviewService: HrInterviewService;

  const mockExternalId = '1a';
  const mockPhoto = 'photo';
  const mockRouter = {
    snapshot: { params: { id: '1' } }
  };
  const mockUserDetails = {
    photo: mockPhoto,
    externalId: mockExternalId,
    username: 'Dan Balan',
    roles: [],
    fullNameEn: 'Dan Balan'
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HrInterviewComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [HrInterviewService, { provide: ActivatedRoute, useValue: mockRouter }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrInterviewComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    hrInterviewService = TestBed.inject(HrInterviewService);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create HrInterviewComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should call getUserInfo from UserService', () => {
      const spy = spyOn(userService, 'getUserInfo$').and.returnValue(of(mockUserDetails));

      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
    });

    it('should set value for avatar', () => {
      spyOn(userService, 'getUserInfo$').and.returnValue(of(mockUserDetails));

      component.ngOnInit();

      const mockAvatar = `data:image/jpeg;base64,${mockPhoto}`;

      expect(component.avatar).toBe(mockAvatar);
    });

    it('should set value for hrInterviewListId', () => {
      component.ngOnInit();

      expect(component.hrInterviewListId).toBe(mockRouter.snapshot.params.id);
    });
  });

  describe('onSendForm', () => {
    it('should set value for hrInterviewAnswersList', () => {
      component.onSendForm(MOCK_HR_INTERVIEW_LIST);

      expect(component.hrInterviewAnswersList).toBe(MOCK_HR_INTERVIEW_LIST);
    });

    it('should set true for isView', () => {
      component.onSendForm(MOCK_HR_INTERVIEW_LIST);

      expect(component.isView).toBeTruthy();
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe on destroy hook', () => {
      const nextSpy = spyOn(component['destroy$'], 'next');
      const completeSpy = spyOn(component['destroy$'], 'complete');

      component.ngOnDestroy();

      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });
});
