import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserProjectComponent } from './user-project.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IAllocation } from '@interfaces/userInfo.interface';
import { ProjectEmployeeListModalComponent } from '@pages/employee/project-employee-list-modal/project-employee-list-modal.component';

const allocationMock: IAllocation = {
  type: 'test',
  hours: 1,
  rate: false,
  startDate: '22',
  stopDate: '22',
  project: {
    id: 'test',
    name: 'test',
    teamQty: 1,
    projectManager: {
      id: 'test',
      name: 'test',
      isWork: true
    },
    resourceManager: {
      id: 'test',
      name: 'test',
      isWork: true
    },
    deliveryManager: {
      id: 'test',
      name: 'test',
      isWork: true
    },
    employees: []
  }
};

describe('UserProjectComponent', () => {
  let component: UserProjectComponent;
  let fixture: ComponentFixture<UserProjectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserProjectComponent],
      imports: [],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MatDialog, useValue: { open: () => { } } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProjectComponent);
    component = fixture.componentInstance;
    component.allocation = allocationMock;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('toSeeEmployeeList should open modal window', () => {
    const modal = TestBed.inject(MatDialog);
    spyOn(modal, 'open');

    component.toSeeEmployeeList([]);

    expect(modal.open).toHaveBeenCalledOnceWith(ProjectEmployeeListModalComponent, jasmine.any(Object));
  });
});

