import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PortalSelectComponent } from './portal-select.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

describe('PortalSelectComponent', () => {
  let component: PortalSelectComponent;
  let fixture: ComponentFixture<PortalSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PortalSelectComponent],
      imports: [SafeHtmlModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
