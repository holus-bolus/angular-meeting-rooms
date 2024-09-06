import { IExtraMile } from '@interfaces/userInfo.interface';
import { of } from 'rxjs';
import { EmployeeService } from '@services/employee.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserExtraMileComponent } from './user-extra-mile.component';
import { SlideTogglerModule } from '@andkit/components/other/slide-toggler/slide-toggler.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const extraMileMock: IExtraMile = {
  isExtraMile: true,
  comment: 'COMMENT',
  canEdit: false
};

describe('UserExtraMileComponent', () => {
  let component: UserExtraMileComponent;
  let fixture: ComponentFixture<UserExtraMileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserExtraMileComponent],
      imports: [SlideTogglerModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: EmployeeService, useValue: { changeExtraMile: () => of(true) } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserExtraMileComponent);
    component = fixture.componentInstance;
    component.extraMiles = { ...extraMileMock };
    component.userId = 'USER_ID';
  });

  afterEach(() => fixture.destroy());

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('onClickExtraMile should set isShowModal to true', () => {
    component.isShowModal = null;
    expect(component.isShowModal).toBe(null);

    component.onClickExtraMile();
    expect(component.isShowModal).toBe(true);
  });

  describe('onChangeExtraMile', () => {
    it('should call employeeService.changeExtraMile', () => {
      const service = TestBed.inject(EmployeeService);
      spyOn(service, 'changeExtraMile').and.callThrough();

      component.onChangeExtraMile('COMMENT');
      expect(service.changeExtraMile).toHaveBeenCalledWith('USER_ID', 'COMMENT');
    });


    it('should set !isExtraMile', () => {
      expect(component.extraMiles.isExtraMile).toBe(true);

      component.onChangeExtraMile('COMMENT');

      expect(component.extraMiles.isExtraMile).toBe(false);
    });

    it('should set comment to extraMile', () => {
      expect(component.extraMiles.comment).toBe('COMMENT');

      component.onChangeExtraMile('CHANGED_COMMENT');

      expect(component.extraMiles.comment).toBe('CHANGED_COMMENT');
    });

    it('should hide modal window', () => {
      component.isShowModal = true;
      expect(component.isShowModal).toBe(true);

      component.onChangeExtraMile('COMMENT');
      expect(component.isShowModal).toBe(false);
    });
  });

  it('onCloseModal should set false to isShowModal', () => {
    component.isShowModal = true;
    expect(component.isShowModal).toBe(true);

    component.onCloseModal();
    expect(component.isShowModal).toBe(false);
  });


});
