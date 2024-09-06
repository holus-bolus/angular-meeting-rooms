import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OneToOneListComponent } from './one-to-one-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SafePipe } from '@pipes/safe-html/safe-html.pipe';
import { OneToOneRowComponent } from '@pages/employee/one-to-one/one-to-one-list/one-to-one-row/one-to-one-row.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('OneToOneListComponent', () => {
  let component: OneToOneListComponent;
  let fixture: ComponentFixture<OneToOneListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [OneToOneListComponent, SafePipe, OneToOneRowComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneToOneListComponent);
    component = fixture.componentInstance;
    component.oneToOneList = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
