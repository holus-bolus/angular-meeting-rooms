import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AssessmentModalComponent } from './assessment-modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { DatePickerModule } from '@andkit/components/pickers/date-picker/date-picker.module';
import { ModalScrollService } from '@services/modalScroll.service';

class ModalScrollServiceMock {
  disable():void {}
  enable(): void {}
}

describe('AssessmentModalComponent', () => {
  let component: AssessmentModalComponent;
  let fixture: ComponentFixture<AssessmentModalComponent>;
  let service: ModalScrollService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AssessmentModalComponent],
      imports: [SafeHtmlModule, DatePickerModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ModalScrollService, useClass: ModalScrollServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentModalComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ModalScrollService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call disable service method', () => {
    const spy = spyOn(service, 'disable');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call enable service method', () => {
    const spy = spyOn(service, 'enable');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit event', () => {
    const spy = spyOn(component.closeClick, 'emit');
    component.onCloseModal(false);
    expect(spy).toHaveBeenCalled();
  });
});
