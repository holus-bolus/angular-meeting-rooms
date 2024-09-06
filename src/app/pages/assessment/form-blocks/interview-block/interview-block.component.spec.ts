import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InterviewBlockComponent } from './interview-block.component';
import { AssessmentMatrixIconModule } from '@andkit/components/other/assessment-matrix-icon/assessment-matrix-icon.module';
import { ButtonModule } from '@andkit/components/buttons/button/button.module';

describe('InterviewBlockComponent', () => {
  let component: InterviewBlockComponent;
  let fixture: ComponentFixture<InterviewBlockComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ AssessmentMatrixIconModule, ButtonModule ],
      declarations: [ InterviewBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
