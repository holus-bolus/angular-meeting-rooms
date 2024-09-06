import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { RolesService } from '@services/roles.service';
import { Observable, of } from 'rxjs';

class MockPersistancetorage {
  getRoles(): Observable<string[]> {
    return of(['Employee, Admin']);
  }
}

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let service: MockPersistancetorage;

  beforeEach(waitForAsync(() => {
    service = new MockPersistancetorage();
    TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      imports: [ HttpClientTestingModule, RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }) ],
      providers: [{provide: RolesService, useValue: service}],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
