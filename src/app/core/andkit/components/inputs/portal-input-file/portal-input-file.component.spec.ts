import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PortalInputFileComponent } from './portal-input-file.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

describe('PortalInputFileComponent', () => {
  let component: PortalInputFileComponent;
  let fixture: ComponentFixture<PortalInputFileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalInputFileComponent ],
      imports: [ SafeHtmlModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalInputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
