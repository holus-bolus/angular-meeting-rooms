import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OneToOneViewModalComponent } from './one-to-one-view-modal.component';
import { SafePipe } from '@pipes/safe-html/safe-html.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MaterialInfoBtnComponent } from '@andkit/components/buttons/material-info-btn/material-info-btn.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('OneToOneViewModalComponent', () => {
  let component: OneToOneViewModalComponent;
  let fixture: ComponentFixture<OneToOneViewModalComponent>;
  const data = {
    oneToOne : {
      id: 'test',
      interviewDate: new Date(),
      interviewer: {
        id: 'test',
        position: 'test',
        name: 'test',
        isWork: true
      },
      riskOfLeaving: 'test',
      type: 'test',
      comment: 'test',
      canEdit: true
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatButtonModule],
      declarations: [OneToOneViewModalComponent, SafePipe, MaterialInfoBtnComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneToOneViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
