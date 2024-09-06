import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MainEventsFilterComponent } from './main-events-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

describe('MainEventsFilterComponent', () => {
  let component: MainEventsFilterComponent;
  let fixture: ComponentFixture<MainEventsFilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MainEventsFilterComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, SafeHtmlModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainEventsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
