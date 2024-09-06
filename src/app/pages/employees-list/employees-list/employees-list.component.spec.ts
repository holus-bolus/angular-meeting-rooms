import { AuthenticationService } from './../../../core/services/authentication.service';
import { IEmployeeFilter } from '@interfaces/employee';
import { RolesService } from '@services/roles.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { of } from 'rxjs';
import { IEmployeesRows } from './../../../interfaces/employee';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EmployeesListComponent } from './employees-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EmployeeService } from '@services/employee.service';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

const employees: IEmployeesRows = {
  page: 1,
  pageSize: 1,
  totalItems: 5,
  totalPages: 5,
  employees: []
};

const employeeFilterMock: IEmployeeFilter = {
  surname: 'SURNAME'
};

describe('EmployeesListComponent', () => {
  let component: EmployeesListComponent;
  let fixture: ComponentFixture<EmployeesListComponent>;

  const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAll']);
  employeeServiceSpy.getAll.and.returnValue(of(employees));

  const rolesServiceSpy = jasmine.createSpyObj('RolesService', ['isAdmin$']);
  rolesServiceSpy.isAdmin$.and.returnValue(of(true));

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      imports: [SafeHtmlModule, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: AuthenticationService, useValue: { } },
        { provide: EmployeeService, useValue: employeeServiceSpy },
        { provide: RolesService, useValue: rolesServiceSpy },
        { provide: ActivatedRoute, useValue: { queryParams: of(employeeFilterMock) } },
        {
          provide: Router,
          useValue: {
            events: of(new Scroll(null, null, null)),
            navigate: () => { }
          }
        }
      ],
      declarations: [EmployeesListComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesListComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => fixture.destroy());

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      employeeServiceSpy.getAll.and.returnValue(of(employees));
    });

    it('should set params and isLoading to true', () => {
      component.params = null;
      component.isLoading = null;

      fixture.detectChanges();

      expect(component.params).toEqual({ surname: 'SURNAME' });
      expect(component.isLoading).toBeFalse();
    });

    it('should call getEmployees', () => {
      spyOn<any>(component, 'getEmployees').and.callThrough();

      fixture.detectChanges();

      expect(component['getEmployees']).toHaveBeenCalledTimes(1);
    });

    it('should set isSpinnerShown to false', () => {
      component.isSpinnerShown = null;
      expect(component.isSpinnerShown).toBeFalsy();

      fixture.detectChanges();
      expect(component.isSpinnerShown).toBeFalse();
    });

    it('should set paginator params', () => {
      const expected = {
        totalItems: employees.totalItems,
        itemsPerPage: employees.pageSize,
        currentPage: employees.page
      };

      fixture.detectChanges();

      expect(component.paginationConfig).toEqual(expected);
      expect(component.employees).toEqual(jasmine.any(Array));
      expect(component.totalItemsCount).toBe(5);
      expect(component.totalPages).toBe(5);
    });

    it('should not set paginator params', () => {
      employeeServiceSpy.getAll.and.returnValue(of(null));

      fixture.detectChanges();

      expect(component.employees).toBeFalsy();
      expect(component.totalItemsCount).toBeFalsy();
      expect(component.totalPages).toBeFalsy();
    });

    it('should call window.requestAnimationFrame', () => {
      spyOn(window, 'requestAnimationFrame');

      fixture.detectChanges();

      expect(window.requestAnimationFrame).toHaveBeenCalledWith(jasmine.any(Function));
    });
  });

  describe('onSendPageNumber', () => {
    it('should set pagination height', () => {
      fixture.detectChanges();
      component.paginationHeight = null;
      expect(component.paginationHeight).toBeFalsy();

      component.onSendPageNumber(42);
      expect(component.paginationHeight).toEqual(jasmine.any(Number));
    });

    it('should call setupUrl', () => {
      fixture.detectChanges();

      spyOn<any>(component, 'setupUrl').and.callFake(() => { });

      component.onSendPageNumber(42);

      expect(component['setupUrl']).toHaveBeenCalledOnceWith(42);
    });
  });

  describe('onSendFilters', () => {
    it('should set params and paginationHeight to 0', () => {
      component.params = null;
      expect(component.params).toBe(null);

      component.paginationHeight = null;
      expect(component.paginationHeight).toBe(null);

      component.onSendFilters({});
      expect(component.params).toEqual({});
      expect(component.paginationHeight).toBe(0);
    });

    it('should call setupUrl', () => {
      spyOn<any>(component, 'setupUrl').and.callFake(() => { });

      component.onSendFilters({});

      expect(component['setupUrl']).toHaveBeenCalledOnceWith(1);
    });
  });
});
