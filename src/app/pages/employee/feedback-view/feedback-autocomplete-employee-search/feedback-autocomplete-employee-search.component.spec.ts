import { IEmployeeTeammates, IEmployeePhoto } from './../../../../interfaces/employee';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FeedbackAutocompleteEmployeeSearchComponent } from './feedback-autocomplete-employee-search.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
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

const employeePhotoMock: IEmployeePhoto[] = [
  { id: '1', name: 'Photo 1', photo: 'photo' },
  { id: '1', name: 'Photo 1', photo: '' },
  { id: '1', name: 'Photo 1', photo: '' }
];

describe('FeedbackAutocompleteEmployeeSearchComponent', () => {
  let component: FeedbackAutocompleteEmployeeSearchComponent;
  let fixture: ComponentFixture<FeedbackAutocompleteEmployeeSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackAutocompleteEmployeeSearchComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackAutocompleteEmployeeSearchComponent);
    component = fixture.componentInstance;
    component.approverNameControl = new FormControl('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit option', () => {
    spyOn(component.selectOption, 'emit');

    component.onSelectOption(teammateMock);

    expect(component.selectOption.emit).toHaveBeenCalledOnceWith(teammateMock);
  });

  it('create suggestion should mutate value', () => {
    const actual = component['createSuggestions'](employeePhotoMock);

    expect(actual[0].photo).toContain('data:image/jpeg;base64');
    expect(actual[1].photo).toBe(component.defaultAvatarIcon);
    expect(actual[2].photo).toBe(component.defaultAvatarIcon);
  });
});
