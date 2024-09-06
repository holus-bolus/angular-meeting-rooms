import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProjectEmployeeListModalComponent } from '@pages/employee/project-employee-list-modal/project-employee-list-modal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SafePipe } from '@pipes/safe-html/safe-html.pipe';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('ProjectEmployeeListModalComponent', () => {
  let component: ProjectEmployeeListModalComponent;
  let fixture: ComponentFixture<ProjectEmployeeListModalComponent>;
  const data = {
    employeeList: [
      {
        id: 'test',
        name: 'test',
        fullNameRu: 'test',
        isWork: true,
        level: 'test',
        resourceManager: {
          id: 'test',
          name: 'test',
          isWork: true
        },
        roles: ['one', 'two'],
        location: {}
      }
    ],
    title: 'string'
  };
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatDialogModule, BrowserAnimationsModule],
      declarations: [ProjectEmployeeListModalComponent, SafePipe],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: data }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEmployeeListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
