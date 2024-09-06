import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

import { ObjectivesArchiveInfoModalComponent } from './objectives-archive-info-modal.component';

describe('ObjectivesArchiveInfoModalComponent', () => {
  let component: ObjectivesArchiveInfoModalComponent;
  let fixture: ComponentFixture<ObjectivesArchiveInfoModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectivesArchiveInfoModalComponent],
      imports: [SafeHtmlModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectivesArchiveInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ObjectivesArchiveInfoModalComponent', () => {
    expect(component).toBeTruthy();
  });
});
