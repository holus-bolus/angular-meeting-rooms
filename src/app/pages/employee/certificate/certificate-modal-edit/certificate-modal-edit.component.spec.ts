import { AndkitModule } from '@andkit/andkit.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { CertificateService } from '@services/certificate.service';
import { of } from 'rxjs';
import { CertificateModalEditComponent } from './certificate-modal-edit.component';

describe('CertificateModalEditComponent', () => {
  let component: CertificateModalEditComponent;
  let fixture: ComponentFixture<CertificateModalEditComponent>;

  const mockData = {
    certificate: { objectives: [] },
    techLevelList: [],
    technologies: []
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CertificateModalEditComponent],
      imports: [AndkitModule, HttpClientTestingModule, SafeHtmlModule, BrowserAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: MatDialogRef, useValue: { backdropClick: () => of(null) } },
        CertificateService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create CertificateModalEditComponent', () => {
    expect(component).toBeTruthy();
  });
});
