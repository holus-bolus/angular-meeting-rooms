import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PortalInputComponent } from './portal-input.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

describe('PortalInputComponent', () => {
  let component: PortalInputComponent;
  let fixture: ComponentFixture<PortalInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalInputComponent ],
      imports: [ SafeHtmlModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
