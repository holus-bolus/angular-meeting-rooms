import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmployeeVacationsListComponent } from './employee-vacations-list.component';
import { MatTableModule } from '@angular/material/table';

describe('EmployeeVacationsListComponent', () => {
  let component: EmployeeVacationsListComponent;
  let fixture: ComponentFixture<EmployeeVacationsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule],
      declarations: [EmployeeVacationsListComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeVacationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
