import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ObjectivesNoDataComponent } from './objectives-no-data.component';

describe('ObjectivesNoDataComponent', () => {
  let component: ObjectivesNoDataComponent;
  let fixture: ComponentFixture<ObjectivesNoDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectivesNoDataComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectivesNoDataComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('label should be Objective list is empty', () => {
    component.isRM = true;

    fixture.detectChanges();

    expect(component.label).toBe('Objective list is empty');
  });

  it('label should be Objective list is empty. Contact with RM to add an objective', () => {
    component.isRM = false;

    fixture.detectChanges();

    expect(component.label).toBe('Objective list is empty. Contact with RM to add an objective');
  });
});
