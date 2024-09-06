import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CandidatesListComponent } from './candidates-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TruncatePipeModule } from '@pipes/truncate/truncate.pipe.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControl } from '@angular/forms';

describe('CandidatesListComponent', () => {
  let component: CandidatesListComponent;
  let fixture: ComponentFixture<CandidatesListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TruncatePipeModule,
        ScrollingModule,
        RouterModule.forRoot([], { relativeLinkResolution: 'legacy' })
      ],
      declarations: [CandidatesListComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatesListComponent);
    component = fixture.componentInstance;
    component.employeeForm = new FormControl('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
