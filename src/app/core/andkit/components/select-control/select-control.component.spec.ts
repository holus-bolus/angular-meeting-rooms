import { SafeHtmlModule } from './../../../../pipes/safe-html/safe-html.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectControlComponent } from './select-control.component';

describe('SelectControlComponent', () => {
  let component: SelectControlComponent;
  let fixture: ComponentFixture<SelectControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectControlComponent],
      imports: [SafeHtmlModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
