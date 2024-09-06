import { AndkitModule } from '@andkit/andkit.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrintService } from '@services/print.service';
import { BehaviorSubject, of } from 'rxjs';
import { CertificateModalHrViewComponent } from './certificate-modal-hr-view.component';

describe('CertificateModalHrViewComponent', () => {
  let component: CertificateModalHrViewComponent;
  let fixture: ComponentFixture<CertificateModalHrViewComponent>;

  const mockData = { isUpdated$: new BehaviorSubject(false), certificates: [] };
  const mockMatDialogRedData = { beforeClosed: () => of(null) };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CertificateModalHrViewComponent],
      imports: [MatDialogModule, AndkitModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: MatDialogRef, useValue: mockMatDialogRedData },
        PrintService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateModalHrViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create CertificateModalHrViewComponent', () => {
    expect(component).toBeTruthy();
  });
});
