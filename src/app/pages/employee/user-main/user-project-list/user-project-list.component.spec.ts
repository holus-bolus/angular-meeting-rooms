import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserProjectListComponent } from './user-project-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UserProjectListComponent', () => {
  let component: UserProjectListComponent;
  let fixture: ComponentFixture<UserProjectListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserProjectListComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProjectListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('toggleBtnName', () => {
    it('should return [Hide previous projects] when isShowPreviousProjects [true]', () => {
      component.isShowPreviousProjects = true;

      expect(component.toggleBtnName).toBe('Hide previous projects');
    });

    it('should return [Show previous projects] when isShowPreviousProjects [false]', () => {
      component.isShowPreviousProjects = false;

      expect(component.toggleBtnName).toBe('Show previous projects');
    });
  });

  it('should toggle isShowPreviousProjects', () => {
    component.isShowPreviousProjects = false;
    expect(component.isShowPreviousProjects).toBeFalse();

    component.onTogglePrevProjects();
    expect(component.isShowPreviousProjects).toBeTrue();
  });
});
