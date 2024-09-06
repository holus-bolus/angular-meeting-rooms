import { ActionSelectorModule } from '@andkit/components/selects/action-selector/action-selector.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { CertificateService } from '@services/certificate.service';
import { CertificateViewComponent } from './certificate-view.component';

describe('CertificateViewComponent', () => {
  let component: CertificateViewComponent;
  let fixture: ComponentFixture<CertificateViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CertificateViewComponent],
      providers: [CertificateService, { provide: MatDialog, useValue: {} }],
      imports: [ActionSelectorModule, HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create CertificateViewComponent', () => {
    expect(component).toBeTruthy();
  });
});
