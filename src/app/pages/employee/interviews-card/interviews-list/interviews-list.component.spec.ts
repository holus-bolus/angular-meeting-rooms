import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InterviewsListComponent } from './interviews-list.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { IEmployeeInterview } from '@interfaces/interview';


describe('InterviewsListComponent', () => {
  let component: InterviewsListComponent;
  let fixture: ComponentFixture<InterviewsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewsListComponent],
      imports: [SafeHtmlModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewsListComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => fixture.destroy());

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('onToggleActive', () => {
    it('should emit true', () => {
      spyOn(component.toggleActive, 'emit');

      component.onToggleActive(true);

      expect(component.toggleActive.emit).toHaveBeenCalledOnceWith(true);
    });
  });

  describe('onShowMore', () => {
    it('should emit event', () => {
      spyOn(component.showMore, 'emit');

      component.onShowMore();

      expect(component.showMore.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe('onFinish', () => {
    it('should emit event', () => {
      spyOn(component.finish, 'emit');

      component.onFinish();

      expect(component.finish.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe('trackById', () => {
    it('should return SALARY_REVIEW_ID', () => {
      const actual = component.trackById(0, { salaryReviewId: 'SALARY_REVIEW_ID' } as IEmployeeInterview);

      expect(actual).toBe('SALARY_REVIEW_ID');
    });
  });
});
