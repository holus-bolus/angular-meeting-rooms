import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CoordinatorCabinetComponent } from './coordinator-cabinet.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { SafeHtmlModule } from '../../../pipes/safe-html/safe-html.module';
import { TimezoneModule } from '../../../pipes/timezone/timezone.module';

const routeDetails = {
  snapshot: {
    firstChild: {
      routeConfig: {}
    }
  },
};

describe('CoordinatorCabinetComponent', () => {
  let component: CoordinatorCabinetComponent;
  let fixture: ComponentFixture<CoordinatorCabinetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, SafeHtmlModule, TimezoneModule, RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }) ],
      declarations: [ CoordinatorCabinetComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: routeDetails },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
