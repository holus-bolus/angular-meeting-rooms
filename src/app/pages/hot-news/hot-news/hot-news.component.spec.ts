import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HotNewsComponent } from './hot-news.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

describe('HotNewsComponent', () => {
  let component: HotNewsComponent;
  let fixture: ComponentFixture<HotNewsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, NgxPaginationModule, RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }) ],
      declarations: [ HotNewsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
