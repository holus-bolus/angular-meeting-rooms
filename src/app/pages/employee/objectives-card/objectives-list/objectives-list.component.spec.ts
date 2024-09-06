import { ObjectiveToArchiveModalComponent } from './../objective-to-atchive-modal/objective-to-archive-modal.component';
import { OBJECTIVES_MODAL_WINDOW_WIDTH } from './../objectives-const';
import { ObjectivesAddModalComponent } from './../objectives-add-modal/objectives-add-modal.component';
import { IObjective, TypeObjectiveStatusOption, TYPE_OBJECTIVE_STATUS_NAME, TYPE_SELECT_OPTIONS_IDS, TYPE_SELECT_OPTIONS_NAME } from './../../../../interfaces/objective';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ObjectivesService } from './../../../../core/services/objectives.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ObjectivesListComponent } from './objectives-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const matDialogOpenMock = {
  componentInstance: {
    cancelEvent: of({}),
    confirmEvent: of({}),
    onClose: () => { }
  },
  backdropClick: () => of({}),
  afterClosed: () => of({}),
  close: () => { }
};

const objectiveStatusMock: TypeObjectiveStatusOption = {
  id: 1,
  name: TYPE_OBJECTIVE_STATUS_NAME.FAILED
};

const objectiveMock: IObjective = {
  employeeId: 'EMPLOYEE_ID',
  objective: 'OBJECTIVE',
  type: TYPE_SELECT_OPTIONS_NAME.HARD_SKILLS,
  dueDate: '',
  comment: 'COMMENT',
  status: TYPE_OBJECTIVE_STATUS_NAME.DONE
};

describe('ObjectivesListComponent', () => {
  let component: ObjectivesListComponent;
  let fixture: ComponentFixture<ObjectivesListComponent>;

  const objectivesServiceSpy = jasmine.createSpyObj('ObjectivesService', ['updateObjective']);
  const matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectivesListComponent],
      imports: [SafeHtmlModule, HttpClientTestingModule],
      providers: [
        { provide: ObjectivesService, useValue: objectivesServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectivesListComponent);
    component = fixture.componentInstance;

    matDialogSpy.open.and.returnValue(matDialogOpenMock);
    objectivesServiceSpy.updateObjective.and.returnValue(of(true));

    fixture.detectChanges();
  });

  afterEach(() => fixture.detectChanges());

  it('should create ObjectivesListComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('openModal', () => {
    it('should call modal.open', () => {
      const modal = TestBed.inject(MatDialog);

      component['openModal'](objectiveMock, false);

      expect(modal.open).toHaveBeenCalledWith(ObjectivesAddModalComponent, jasmine.any(Object));
    });

    it('should call modal.open with isDisabled=false', () => {
      const modal = TestBed.inject(MatDialog);

      component['openModal'](objectiveMock, false);

      const arg = {
        width: OBJECTIVES_MODAL_WINDOW_WIDTH,
        disableClose: true,
        data: {
          objectiveStaticData: objectiveMock,
          isDisabled: false,
          employeeId: component.employeeId,
          interviewerId: component.interviewerId
        }
      };

      expect(modal.open).toHaveBeenCalledWith(ObjectivesAddModalComponent, arg);
    });

    it('should call modal.open with isDisabled=true', () => {
      const modal = TestBed.inject(MatDialog);

      component['openModal'](objectiveMock, true);

      const arg = {
        width: OBJECTIVES_MODAL_WINDOW_WIDTH,
        disableClose: true,
        data: {
          objectiveStaticData: objectiveMock,
          isDisabled: true,
          employeeId: component.employeeId,
          interviewerId: component.interviewerId
        }
      };

      expect(modal.open).toHaveBeenCalledWith(ObjectivesAddModalComponent, arg);
    });

    it('should call modal.open with isDisabled=true without arg', () => {
      const modal = TestBed.inject(MatDialog);

      component['openModal'](objectiveMock);

      const arg = {
        width: OBJECTIVES_MODAL_WINDOW_WIDTH,
        disableClose: true,
        data: {
          objectiveStaticData: objectiveMock,
          isDisabled: true,
          employeeId: component.employeeId,
          interviewerId: component.interviewerId
        }
      };

      expect(modal.open).toHaveBeenCalledWith(ObjectivesAddModalComponent, arg);
    });
  });

  it('rowClick should call openModal', () => {
    spyOn<any>(component, 'openModal');

    component.rowClick(objectiveMock);

    expect(component['openModal']).toHaveBeenCalledWith(objectiveMock);
  });

  it('openStatus should call openModal', () => {
    spyOn<any>(component, 'openModal');

    component.openStatus(objectiveMock);

    expect(component['openModal']).toHaveBeenCalledWith(objectiveMock);
  });

  it('editStatus should call openModal', () => {
    spyOn<any>(component, 'openModal');

    component.editStatus(objectiveMock);

    expect(component['openModal']).toHaveBeenCalledWith(objectiveMock, false);
  });

  it('isCommentOneWord should return true', () => {
    const actual = component.isCommentOneWord('ONE_WORD');

    expect(actual).toBe(true);
  });

  it('isCommentOneWord should return false', () => {
    const actual = component.isCommentOneWord('TWO WORDS');

    expect(actual).toBe(false);
  });

  it('stopPropagation should call event.stopPropagation', () => {
    const event = new Event(null);

    spyOn(event, 'stopPropagation');

    component.stopPropagation(event);

    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
  });

  describe('setStatus', () => {
    let objectiveStaticData;

    beforeEach(() => {
      component.interviewerId = 'INTERVIEWER_ID';
      objectiveStaticData = { ...objectiveMock };
    });

    it('should set objectiveStatusData properties', () => {
      component.setStatus(objectiveStaticData, objectiveStatusMock);

      expect(objectiveStaticData.objectiveStatus).toBe(1);
      expect(objectiveStaticData.status).toBe(TYPE_OBJECTIVE_STATUS_NAME.FAILED);
      expect(objectiveStaticData.interviewerId).toBe('INTERVIEWER_ID');
    });

    it('should open modal', () => {
      const service = TestBed.inject(MatDialog);

      component.setStatus(objectiveStaticData, objectiveStatusMock);

      expect(service.open).toHaveBeenCalledWith(ObjectiveToArchiveModalComponent, jasmine.any(Object));
    });
  });
});
