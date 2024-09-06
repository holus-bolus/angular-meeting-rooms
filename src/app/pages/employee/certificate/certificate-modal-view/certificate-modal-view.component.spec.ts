import { CertificateDateModule } from './../../../../pipes/certificate-date/certificate-date.module';
import { AndkitModule } from '@andkit/andkit.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CertificateService } from '@services/certificate.service';
import { PrintService } from '@services/print.service';
import { CertificateModalViewComponent } from './certificate-modal-view.component';

describe('CertificateModalViewComponent', () => {
  let component: CertificateModalViewComponent;
  let fixture: ComponentFixture<CertificateModalViewComponent>;

  const mockData = { certificates: [{ createDate: '2021-05-21T14:00:000' }], currentIndex: 0 };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CertificateModalViewComponent],
      providers: [CertificateService, PrintService, { provide: MAT_DIALOG_DATA, useValue: mockData }],
      imports: [AndkitModule, HttpClientTestingModule, CertificateDateModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateModalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create CertificateModalViewComponent', () => {
    expect(component).toBeTruthy();
  });
});
