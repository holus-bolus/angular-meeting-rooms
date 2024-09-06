import { AndkitModule } from '@andkit/andkit.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

import { ObjectiveToArchiveModalComponent } from './objective-to-archive-modal.component';

describe('ObjectiveToArchiveModalComponent', () => {
  let component: ObjectiveToArchiveModalComponent;
  let fixture: ComponentFixture<ObjectiveToArchiveModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectiveToArchiveModalComponent],
      imports: [SafeHtmlModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { objectiveStaticData: {} } },
        { provide: MatDialog, useValue: { closeAll: () => { } } },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveToArchiveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ObjectiveToArchiveModalComponent', () => {
    expect(component).toBeTruthy();
  });

  it('onClose should call modalWindow.closeAll', () => {
    const service = TestBed.inject(MatDialog);

    spyOn(service, 'closeAll');

    component.onClose();

    expect(service.closeAll).toHaveBeenCalled();
  });

  it('onSubmit should emit value', () => {
    component.commentControl.setValue('COMMENT');

    spyOn(component.confirmEvent, 'emit');

    component.onSubmit();

    expect(component.confirmEvent.emit).toHaveBeenCalledWith('COMMENT');
  });

  it('commentControl.value should be COMMENT_DATA', () => {
    component['objectiveStaticData'].comment = 'COMMENT_DATA';

    component['initForm']();

    expect(component.commentControl.value).toBe('COMMENT_DATA');
  });

  it('commentControl.value should be empty string', () => {
    component['objectiveStaticData'].comment = '';

    component['initForm']();

    expect(component.commentControl.value).toBe('');
  });
});
