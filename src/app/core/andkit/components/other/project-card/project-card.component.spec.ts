import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProjectCardComponent } from './project-card.component';
import { RouterModule } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { RolesService } from '@services/roles.service';
import { Observable, of } from 'rxjs';

const projectMocked = {
  employees: [],
  id: '',
  name: '',
  teamQty: 1,
  projectManagerName: '',
  projectManagerId: '',
  resourceManagerName: '',
  resourceManagerId: '',
  deliveryManager: {
    id: '',
    name: '',
  },
};

class MockPersistancetorage {
  isNotEmployee$(): Observable<string[]> {
    return of([]);
  }
}

describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;
  let service: MockPersistancetorage;

  beforeEach(waitForAsync(() => {
    service = new MockPersistancetorage();
    TestBed.configureTestingModule({
      declarations: [ProjectCardComponent],
      imports: [RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }), SafeHtmlModule],
      providers: [{ provide: RolesService, useValue: service }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
    component.project = projectMocked;
    fixture.detectChanges();
  });

  it('should create ProjectCardComponent', () => {
    expect(component).toBeTruthy();
  });
});
