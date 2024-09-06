import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SettingsMultiselectComponent } from './settings-multiselect.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SafePipe } from '@pipes/safe-html/safe-html.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DropdownWithIconComponent', () => {
  let component: SettingsMultiselectComponent;
  let fixture: ComponentFixture<SettingsMultiselectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [SettingsMultiselectComponent, SafePipe],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsMultiselectComponent);
    component = fixture.componentInstance;
    component.selectList = [
      {
        id: 'test',
        name: 'test',
        disabled: false,
        checked: false
      }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
