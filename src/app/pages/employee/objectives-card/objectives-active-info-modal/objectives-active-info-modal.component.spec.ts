import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

import { ObjectivesActiveInfoModalComponent } from './objectives-active-info-modal.component';

describe('ObjectivesActiveInfoModalComponent', () => {
  let component: ObjectivesActiveInfoModalComponent;
  let fixture: ComponentFixture<ObjectivesActiveInfoModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectivesActiveInfoModalComponent],
      imports: [SafeHtmlModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectivesActiveInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ObjectivesActiveInfoModalComponent', () => {
    expect(component).toBeTruthy();
  });
});
