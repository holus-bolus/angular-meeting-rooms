import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RolesService } from '@services/roles.service';
import { Observable, of } from 'rxjs';
import { PortalHeaderComponent } from './portal-header.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { MatMenuModule } from '@angular/material/menu';

class MockPersistancetorage {
  isAdmin(): Observable<string[]> {
    return of(['Admin']);
  }

  isAdminHr(): Observable<string[]> {
    return of(['Hr, Admin']);
  }

  isHr(): Observable<string[]> {
    return of(['Hr']);
  }

  isContentManager(): Observable<string[]> {
    return of(['ContentManager']);
  }

  isAdminHrContentManager(): Observable<string[]> {
    return of(['ContentManager']);
  }

  isAssessmentCoordinator$(): Observable<string[]> {
    return of(['AssessmentCoordinator']);
  }
}

describe('PortalHeaderComponent', () => {
  let component: PortalHeaderComponent;
  let fixture: ComponentFixture<PortalHeaderComponent>;
  let service: MockPersistancetorage;

  beforeEach(waitForAsync(() => {
    service = new MockPersistancetorage();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SafeHtmlModule, RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }), MatMenuModule],
      declarations: [PortalHeaderComponent],
      providers: [{ provide: RolesService, useValue: service }],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
