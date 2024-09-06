import { AndkitModule } from '@andkit/andkit.module';
import { AssessmentToastNotificationModule } from '@andkit/components/other/assessment-toast-notification/assessment-toast-notification.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { CertificateService } from '@services/certificate.service';
import { PrintService } from '@services/print.service';
import { NgxPrinterService } from 'ngx-printer';
import { CertificateMainComponent } from './certificate-main.component';
import { CertificateViewComponent } from './certificate-view/certificate-view.component';

describe('CertificateMainComponent', () => {
  let component: CertificateMainComponent;
  let fixture: ComponentFixture<CertificateMainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CertificateMainComponent, CertificateViewComponent],
      imports: [AssessmentToastNotificationModule, AndkitModule, SafeHtmlModule, HttpClientTestingModule, RouterTestingModule],
      providers: [CertificateService, PrintService, NgxPrinterService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create CertificateMainComponent', () => {
    expect(component).toBeTruthy();
  });
});
