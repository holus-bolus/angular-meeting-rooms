import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AssessmentMatrixIconComponent } from './assessment-matrix-icon.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

describe('AssessmentMatrixIconComponent', () => {
  let component: AssessmentMatrixIconComponent;
  let fixture: ComponentFixture<AssessmentMatrixIconComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentMatrixIconComponent ],
      imports: [ SafeHtmlModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentMatrixIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
