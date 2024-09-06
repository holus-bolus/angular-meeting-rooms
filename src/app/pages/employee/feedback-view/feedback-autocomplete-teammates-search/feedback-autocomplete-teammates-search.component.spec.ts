import { cloneDeep } from 'lodash';
import { IEmployeeTeammates } from './../../../../interfaces/employee';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FeedbackAutocompleteTeammatesSearchComponent } from './feedback-autocomplete-teammates-search.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

const teammateMock: IEmployeeTeammates = {
  id: '1',
  name: 'Teammate',
  roles: ['Role 1'],
  projectNames: ['Project 1'],
  photo: '',
  position: '',
  isEnabled: true
};

describe('FeedbackAutocompleteTeammatesSearchComponent', () => {
  let component: FeedbackAutocompleteTeammatesSearchComponent;
  let fixture: ComponentFixture<FeedbackAutocompleteTeammatesSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackAutocompleteTeammatesSearchComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },
      { provide: MatDialogRef, useValue: {} }]
    })
      .compileComponents();
  }));

  afterEach(() => fixture.destroy());

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackAutocompleteTeammatesSearchComponent);
    component = fixture.componentInstance;
    component.approverNameControl = new FormControl('');
    component.teammates = [cloneDeep(teammateMock), cloneDeep(teammateMock)];
    fixture.detectChanges();
  });

  it('should create FeedbackAutocompleteTeammatesSearchComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should init filteredTeammates and mutate name', () => {
    const expected = [cloneDeep(teammateMock), cloneDeep(teammateMock)]
      .map(({ name, roles, projectNames, ...rest }) => {
        return { ...rest, roles, projectNames, name: `${name}/${roles[0]}/${projectNames[0]}` };
      });

    expect(component.filteredTeammates).toEqual(expected);
  });

  it('autocomplete should emit option', () => {
    const option: IEmployeeTeammates = { ...teammateMock };

    spyOn(component.selectOption, 'emit');

    component.onSelectOption(option);

    expect(component.selectOption.emit).toHaveBeenCalledWith(option);
  });
});
