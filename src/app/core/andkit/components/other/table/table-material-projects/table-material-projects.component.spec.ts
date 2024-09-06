import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TableMaterialProjectsComponent } from './table-material-projects.component';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TableMaterialProjectsComponent', () => {
  let component: TableMaterialProjectsComponent;
  let fixture: ComponentFixture<TableMaterialProjectsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }), MatTableModule],
      declarations: [TableMaterialProjectsComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMaterialProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
