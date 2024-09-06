import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AutocompletePortalComponent } from './autocomplete-portal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MatAutocompleteModule } from '@angular/material/autocomplete';
import {  MatFormFieldModule } from '@angular/material/form-field';
import {  MatInputModule } from '@angular/material/input';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

describe('AutocompletePortalComponent', () => {
  let component: AutocompletePortalComponent;
  let fixture: ComponentFixture<AutocompletePortalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompletePortalComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        SafeHtmlModule,
        MatInputModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompletePortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
