import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FeedbackInstructionModalComponent } from './feedback-instruction-modal.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

describe('FeedbackInstructionModalComponent', () => {
  let component: FeedbackInstructionModalComponent;
  let fixture: ComponentFixture<FeedbackInstructionModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackInstructionModalComponent],
      imports: [
        SafeHtmlModule,
        MatDialogModule,
        MatButtonModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA,  useValue: {} }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackInstructionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
