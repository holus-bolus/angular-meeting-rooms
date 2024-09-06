import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PortalInputFieldComponent } from './portal-input-field.component';
import { AutofocusModule } from '@directives/autofocus/autofocus.module';

describe('PortalInputFieldComponent', () => {
  let component: PortalInputFieldComponent;
  let fixture: ComponentFixture<PortalInputFieldComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ AutofocusModule ],
      declarations: [ PortalInputFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
