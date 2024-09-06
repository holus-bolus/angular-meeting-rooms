import { ObjectiveCardComponent } from './objective-card.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

import doneSvg from '!!raw-loader!../icons/done.svg';
import notDoneSvg from '!!raw-loader!../icons/not-done.svg';
import unknownSvg from '!!raw-loader!../icons/unknown.svg';

describe('ObjectiveCardComponent', () => {
  let component: ObjectiveCardComponent;
  let fixture: ComponentFixture<ObjectiveCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectiveCardComponent],
      imports: [SafeHtmlModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveCardComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => fixture.detectChanges());

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set unknownIcon', () => {
    component.isDone = undefined;

    fixture.detectChanges();

    expect(component.icon).toBe(unknownSvg);
  });

  it('should set doneIcon ', () => {
    component.isDone = true;

    fixture.detectChanges();

    expect(component.icon).toBe(doneSvg);
  });

  it('should set notDoneIcon ', () => {
    component.isDone = false;

    fixture.detectChanges();

    expect(component.icon).toBe(notDoneSvg);
  });
});
