import { ReviewCardComponent } from './review-card.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TimezoneModule } from '@pipes/timezone/timezone.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { LinkModule } from '@pipes/link/link.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ReviewCardComponent', () => {
  let component: ReviewCardComponent;
  let fixture: ComponentFixture<ReviewCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ TimezoneModule, SafeHtmlModule, LinkModule, HttpClientTestingModule ],
      declarations: [ ReviewCardComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
