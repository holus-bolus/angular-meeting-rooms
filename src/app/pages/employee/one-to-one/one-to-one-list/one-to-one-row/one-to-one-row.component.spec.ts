import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OneToOneRowComponent } from './one-to-one-row.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('OneToOneRowComponent', () => {
  let component: OneToOneRowComponent;
  let fixture: ComponentFixture<OneToOneRowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [OneToOneRowComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneToOneRowComponent);
    component = fixture.componentInstance;
    component.oneToOne = {
      id: 'test',
      interviewDate: new Date(),
      nextInterviewDate: new Date(),
      interviewer: {
        id: 'test',
        position: 'test',
        name: 'test',
        isWork: true
      },
      riskOfLeaving: 'test',
      type: 'test',
      comment: 'test',
      canEdit: false,
      modifyDate: new Date(),
      updates: [],
      isLastOneToOne: false
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
