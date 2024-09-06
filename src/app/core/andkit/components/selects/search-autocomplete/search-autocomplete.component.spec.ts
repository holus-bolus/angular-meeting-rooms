import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchAutocompleteComponent } from './search-autocomplete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SafePipe } from '@pipes/safe-html/safe-html.pipe';
import { FormControl, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchAutocompleteComponent', () => {
  let component: SearchAutocompleteComponent;
  let fixture: ComponentFixture<SearchAutocompleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatAutocompleteModule, BrowserAnimationsModule],
      declarations: [SearchAutocompleteComponent, SafePipe],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAutocompleteComponent);
    component = fixture.componentInstance;
    component.option = {
      id: 'test',
      name: 'test',
      checked: false,
      disabled: false,
      selectionName: 'test',
      place: 'test',
      photo: 'test',
      level: 'test',
      technologyId: 'test',
      currency: 'test',
      position: 'test'
    };
    component.control = new FormControl('', [Validators.required]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
