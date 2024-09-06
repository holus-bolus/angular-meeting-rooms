import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmployeesListTableComponent } from './employees-list-table.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EmployeesListTableComponent', () => {
  let component: EmployeesListTableComponent;
  let fixture: ComponentFixture<EmployeesListTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeesListTableComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesListTableComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => fixture.destroy());

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should call createTableSettings', () => {
    spyOn(component, 'createTableSettings');

    fixture.detectChanges();

    expect(component.createTableSettings).toHaveBeenCalledTimes(1);
  });

  it('should emit page number', () => {
    spyOn(component.sendPageNumber, 'emit');

    component.onSendPageNumber(42);

    expect(component.sendPageNumber.emit).toHaveBeenCalledOnceWith(42);
  });

  it('should set 6 columns isAdmin = true', () => {
    component.isAdmin = true;

    component.createTableSettings();

    expect(component.columnDefs.length).toBe(6);
  });

  it('should set 5 columns isAdmin = false', () => {
    component.isAdmin = false;

    component.createTableSettings();

    expect(component.columnDefs.length).toBe(5);
  });
});
