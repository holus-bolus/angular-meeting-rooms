import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TruncatePipeModule } from '@pipes/truncate/truncate.pipe.module';
import { RouterModule } from '@angular/router';
import { CandidateComponent } from './candidate.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { LinkModule } from '@pipes/link/link.module';

describe('CandidateComponent', () => {
  let component: CandidateComponent;
  let fixture: ComponentFixture<CandidateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ TruncatePipeModule, SafeHtmlModule, LinkModule, RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }) ],
      declarations: [ CandidateComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateComponent);
    component = fixture.componentInstance;
    component.employee = {
      id: '',
        name: '',
        position: '',
        level: '1',
        skype: '',
        resourceManager: {id: 'empty', name: 'Mock Mockerson'},
        interviewer: '',
        projects: []
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
