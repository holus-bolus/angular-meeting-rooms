import { AndkitModule } from '@andkit/andkit.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ChooseDownloadTypeModalComponent } from './choose-download-type-modal.component';

describe('ChooseDownloadTypeModalComponent', () => {
  let component: ChooseDownloadTypeModalComponent;
  let fixture: ComponentFixture<ChooseDownloadTypeModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseDownloadTypeModalComponent],
      imports: [MatDialogModule, AndkitModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseDownloadTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ChooseDownloadTypeModalComponent', () => {
    expect(component).toBeTruthy();
  });
});
