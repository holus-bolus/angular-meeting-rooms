import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReadyPageComponent } from './ready-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { ISalaryReview } from '@interfaces/candidate';
import { RouterModule } from '@angular/router';

describe('ReadyPageComponent', () => {
  let component: ReadyPageComponent;
  let fixture: ComponentFixture<ReadyPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }) ],
      declarations: [ ReadyPageComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyPageComponent);
    component = fixture.componentInstance;
    component.candidateDetails = new Observable<ISalaryReview>();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
