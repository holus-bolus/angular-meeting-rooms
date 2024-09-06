import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

import { EmptyPageComponent } from './empty-page.component';

describe('EmptyPageComponent', () => {
  let component: EmptyPageComponent;
  let fixture: ComponentFixture<EmptyPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyPageComponent],
      imports: [SafeHtmlModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create EmptyPageComponent', () => {
    expect(component).toBeTruthy();
  });
});
