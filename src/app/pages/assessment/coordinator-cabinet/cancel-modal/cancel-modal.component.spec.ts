import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CancelModalComponent } from './cancel-modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatePickerModule } from '@andkit/components/pickers/date-picker/date-picker.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const mockUser = {
    id: '',
    name: '',
    position: '',
    level: '',
    skype: '',
    resourceManager: {id: 'empty', name: 'Mock Mockerson'},
    projects: [],
    interviewer: ''
  }
;


describe('CancelModalComponent', () => {
  let component: CancelModalComponent;
  let fixture: ComponentFixture<CancelModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CancelModalComponent],
      imports: [
        BrowserAnimationsModule,
        DatePickerModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        HttpClientTestingModule,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelModalComponent);
    component = fixture.componentInstance;
    component.employee = mockUser;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
