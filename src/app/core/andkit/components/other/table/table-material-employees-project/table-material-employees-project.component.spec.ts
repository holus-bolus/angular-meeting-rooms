import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TableMaterialEmployeesProjectComponent } from './table-material-employees-project.component';
import { MatTableModule } from '@angular/material/table';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TableMaterialEmployeesComponent', () => {
  let component: TableMaterialEmployeesProjectComponent;
  let fixture: ComponentFixture<TableMaterialEmployeesProjectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule],
      declarations: [TableMaterialEmployeesProjectComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMaterialEmployeesProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
