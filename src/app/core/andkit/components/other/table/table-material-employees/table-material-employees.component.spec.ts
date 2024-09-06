import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TableMaterialEmployeesComponent } from './table-material-employees.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TableMaterialEmployeesComponent', () => {
  let component: TableMaterialEmployeesComponent;
  let fixture: ComponentFixture<TableMaterialEmployeesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }), MatTableModule, HttpClientTestingModule],
      declarations: [TableMaterialEmployeesComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMaterialEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
