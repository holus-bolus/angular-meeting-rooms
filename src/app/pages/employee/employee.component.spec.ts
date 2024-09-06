import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EmployeeComponent } from './employee.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const routeDetails = {
  snapshot: {
    paramMap: {
      get: () => ({})
    },
    queryParams: {},
    data: {
      employee: {}
    }
  },
  paramMap: of({}),
};

const state = { navigationId: 1 };
const url = 'employee/1';

const routerService = {
  routerState: { snapshot: { url } },
  events: of({})
};

window.history.pushState(state, null, url);

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [EmployeeComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: routeDetails },
        { provide: Router, useValue: routerService }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
