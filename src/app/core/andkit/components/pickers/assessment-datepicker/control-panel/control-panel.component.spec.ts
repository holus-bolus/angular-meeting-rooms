import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ControlPanelComponent } from './control-panel.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

describe('ControlPanelComponent', () => {
  let component: ControlPanelComponent;
  let fixture: ComponentFixture<ControlPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPanelComponent ],
      imports: [ SafeHtmlModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
