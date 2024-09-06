import { of } from 'rxjs';
import { ResourceManagerService } from './../../../core/services/resourceManagers.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmployeesListFilterComponent } from './employees-list-filter.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, FormBuilder } from '@angular/forms';
import { LocationService } from '@services/location.service';
import { TechnologyService } from '@services/technology.service';
import { ProjectService } from '@services/project.service';
import { EmployeeService } from '@services/employee.service';

describe('EmployeesListFilterComponent', () => {
  let component: EmployeesListFilterComponent;
  let fixture: ComponentFixture<EmployeesListFilterComponent>;
  let formBuilder: FormBuilder;

  const locationServiceSpy = jasmine.createSpyObj('LocationService', ['getLocations']);
  const technologyServiceSpy = jasmine.createSpyObj('TechnologyService', ['getTechnologies']);
  const rmServiceSpy = jasmine.createSpyObj('ResourceManagerService', ['getResourceManagers']);
  const projectServiceSpy = jasmine.createSpyObj('ProjectService', ['getProjectsNames']);
  const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', [
    'getRoles',
    'getUserRoles$',
    'getEmployeeFullNames'
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [EmployeesListFilterComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: LocationService, useValue: locationServiceSpy },
        { provide: TechnologyService, useValue: technologyServiceSpy },
        { provide: ResourceManagerService, useValue: rmServiceSpy },
        { provide: ProjectService, useValue: projectServiceSpy },
        { provide: EmployeeService, useValue: employeeServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesListFilterComponent);
    component = fixture.componentInstance;

    locationServiceSpy.getLocations.and.returnValue(of([]));
    technologyServiceSpy.getTechnologies.and.returnValue(of([]));
    rmServiceSpy.getResourceManagers.and.returnValue(of([]));
    projectServiceSpy.getProjectsNames.and.returnValue(of([]));
    employeeServiceSpy.getRoles.and.returnValue(of([]));
    employeeServiceSpy.getUserRoles$.and.returnValue(of([]));
    employeeServiceSpy.getEmployeeFullNames.and.returnValue(of([]));

    formBuilder = TestBed.inject(FormBuilder);
  });

  afterEach(() => fixture.destroy());

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('initForm', () => {
    it('should init form', () => {
      const expected = {
        project: '',
        surname: '',
        resourceManagers: [],
        technologies: [],
        locations: [],
        roles: [],
        userRoles: [],
      };

      component.initForm();

      expect(component.filtersForm.value).toEqual(expected);
    });

    it('should call getData twice', () => {
      spyOn<any>(component, 'getData').and.callThrough();

      component.initForm();

      expect(component['getData']).toHaveBeenCalledTimes(2);
    });

    it('should call getData with surname and employeesService', () => {
      const spy = spyOn<any>(component, 'getData');
      spy.and.callThrough();

      const employeeService = TestBed.inject(EmployeeService);

      component.initForm();

      expect(spy.calls.first().args[0]).toBe('surname');
      expect(spy.calls.first().args[1]).toBe(employeeServiceSpy.getEmployeeFullNames);
    });

    it('should call getData with project and getProjectsNames', () => {
      const spy = spyOn<any>(component, 'getData');
      spy.and.callThrough();

      const projectService = TestBed.inject(ProjectService);

      component.initForm();

      expect(spy.calls.all()[1].args[0]).toBe('project');
      expect(spy.calls.all()[1].args[1]).toBe(projectService.getProjectsNames);
    });

    it('should call getData and set projects', () => {
      component.projects = null;
      expect(component.projects).toBeFalsy();

      spyOn<any>(component, 'getData').and.callFake(
        () => of([{ id: 'projects', name: 'projects' }])
      );

      component.initForm();

      expect(component.projects).toEqual([{ id: 'projects', name: 'projects' }]);
    });

    it('should call getData and set fullNames', () => {
      component.fullNames = [];
      expect(component.fullNames).toEqual(jasmine.any(Array));

      spyOn<any>(component, 'getData').and.callFake(() => of(null));

      component.initForm();

      expect(component.fullNames).toBe(null);
    });
  });

  it('onSelectOption should set projects to projects control', () => {
    component.filtersForm = formBuilder.group({ projects: '' });
    expect(component.filtersForm.get('projects').value).toBeFalsy();

    component.onSelectOption({ name: 'projects', id: 'projects' }, 'projects');

    expect(component.filtersForm.get('projects').value).toBe('projects');
  });

  describe('onSendFilters', () => {
    it('should call mapDataForServer', () => {
      spyOn<any>(component, 'mapDataForServer');

      component.onSendFilters();

      expect(component['mapDataForServer']).toHaveBeenCalledTimes(1);
    });

    it('should emit value surname', () => {
      spyOn<any>(component, 'mapDataForServer').and.callFake(() => {
        return { surname: 'surname ' };
      });

      spyOn(component.sendFilters, 'emit');

      component.onSendFilters();

      expect(component.sendFilters.emit).toHaveBeenCalledOnceWith({ surname: 'surname ' });
    });
  });

  describe('onResetFilters', () => {
    const resetValue = {
      project: '',
      surname: '',
      resourceManagers: [],
      technologies: [],
      locations: [],
      roles: [],
      userRoles: [],
    };

    const initValue = {
      project: 'project',
      surname: 'surname',
      resourceManagers: null,
      technologies: null,
      locations: null,
      roles: null,
      userRoles: null,
    };

    beforeEach(() => {
      spyOn<any>(component, 'resetCheckedProperty').and.callFake(() => {
        return [{ id: 'surname', name: 'surname' }];
      });

      component.filtersForm = formBuilder.group(initValue);
    });

    it('should call filters reset', () => {
      expect(component.filtersForm.value).toEqual(initValue);

      spyOn(component.filtersForm, 'reset');

      component.onResetFilters();

      expect(component.filtersForm.reset).toHaveBeenCalledOnceWith(resetValue);
    });

    it('should set resourceManagers', () => {
      component.resourceManagers = null;
      expect(component.resourceManagers).toBeFalsy();

      component.onResetFilters();

      expect(component.resourceManagers).toEqual([{ id: 'surname', name: 'surname' }]);
    });

    it('should set roles', () => {
      component.roles = null;
      expect(component.roles).toBeFalsy();

      component.onResetFilters();

      expect(component.roles).toEqual([{ id: 'surname', name: 'surname' }]);
    });

    it('should set technologies', () => {
      component.technologies = null;
      expect(component.technologies).toBeFalsy();

      component.onResetFilters();

      expect(component.technologies).toEqual([{ id: 'surname', name: 'surname' }]);
    });

    it('should set locations', () => {
      component.locations = null;
      expect(component.locations).toBeFalsy();

      component.onResetFilters();

      expect(component.locations).toEqual([{ id: 'surname', name: 'surname' }]);
    });

    it('should set userRoles', () => {
      component.userRoles = null;
      expect(component.userRoles).toBeFalsy();

      component.onResetFilters();

      expect(component.userRoles).toEqual([{ id: 'surname', name: 'surname' }]);
    });

    it('should call resetCheckedProperty 5 times', () => {
      component.onResetFilters();

      expect(component['resetCheckedProperty']).toHaveBeenCalledTimes(5);
    });

    it('should call onSendFilters', () => {
      spyOn(component, 'onSendFilters');

      component.onResetFilters();

      expect(component.onSendFilters).toHaveBeenCalledTimes(1);
    });
  });

  describe('onCheckOption', () => {
    const checkedData = [{ id: 'ID', name: 'NAME', checked: true }];

    beforeEach(() => {
      component.filtersForm = formBuilder.group({
        project: [''],
        surname: [''],
        resourceManagers: [[]],
        technologies: [[]],
        locations: [[]],
        roles: [[]],
        userRoles: [[]],
      });

      spyOn<any>(component, 'getCheckedData').and.callFake(() => {
        return checkedData;
      });
    });

    it('should set resourceManagers and set resourceManagers to form', () => {
      spyOn<any>(component, 'getFormData').and.callFake(() => {
        return [{ id: 'resourceManagers', name: 'resourceManagers' }];
      });

      component.resourceManagers = null;
      expect(component.resourceManagers).toBeFalsy();
      expect(component.filtersForm.get('resourceManagers').value).toEqual([]);

      component.onCheckOption(null, 'resourceManagers');

      expect(component.resourceManagers).toEqual(checkedData);
      expect(component.filtersForm.get('resourceManagers').value).toEqual([{
        id: 'resourceManagers', name: 'resourceManagers'
      }]);
    });

    it('should set technologies and set technologies to form', () => {
      spyOn<any>(component, 'getFormData').and.callFake(() => {
        return [{ id: 'technologies', name: 'technologies' }];
      });

      component.technologies = null;
      expect(component.technologies).toBeFalsy();
      expect(component.filtersForm.get('technologies').value).toEqual([]);

      component.onCheckOption(null, 'technologies');

      expect(component.technologies).toEqual(checkedData);
      expect(component.filtersForm.get('technologies').value).toEqual([{
        id: 'technologies', name: 'technologies'
      }]);
    });

    it('should set locations and set locations to form', () => {
      spyOn<any>(component, 'getFormData').and.callFake(() => {
        return [{ id: 'locations', name: 'locations' }];
      });

      component.locations = null;
      expect(component.locations).toBeFalsy();
      expect(component.filtersForm.get('locations').value).toEqual([]);

      component.onCheckOption(null, 'locations');

      expect(component.locations).toEqual(checkedData);
      expect(component.filtersForm.get('locations').value).toEqual([{
        id: 'locations', name: 'locations'
      }]);
    });

    it('should set roles and set roles to form', () => {
      spyOn<any>(component, 'getFormData').and.callFake(() => {
        return [{ id: 'roles', name: 'roles' }];
      });

      component.roles = null;
      expect(component.roles).toBeFalsy();
      expect(component.filtersForm.get('roles').value).toEqual([]);

      component.onCheckOption(null, 'roles');

      expect(component.roles).toEqual(checkedData);
      expect(component.filtersForm.get('roles').value).toEqual([{
        id: 'roles', name: 'roles'
      }]);
    });

    it('should set userRoles and set userRoles to form', () => {
      spyOn<any>(component, 'getFormData').and.callFake(() => {
        return [{ id: 'userRoles', name: 'userRoles' }];
      });

      component.userRoles = null;
      expect(component.userRoles).toBeFalsy();
      expect(component.filtersForm.get('userRoles').value).toEqual([]);

      component.onCheckOption(null, 'userRoles');

      expect(component.userRoles).toEqual(checkedData);
      expect(component.filtersForm.get('userRoles').value).toEqual([{
        id: 'userRoles', name: 'userRoles'
      }]);
    });
  });

  it('should return commonOption with checked: false', () => {
    const actual = component['resetCheckedProperty']([{
      id: 'userRoles', name: 'userRoles'
    }]);

    expect(actual).toEqual([{
      id: 'userRoles', name: 'userRoles', checked: false
    }]);
  });

  it('should return !checked option', () => {
    component.filtersForm = formBuilder.group({
      project: [''],
      surname: [''],
      resourceManagers: [[]],
      technologies: [[]],
      locations: [[]],
      roles: [[]],
      userRoles: [[]],
    });

    const actual = component['addCheckedProperty'](
      [{ id: 'userRoles', name: 'userRoles' }], 'technologies'
    );

    expect(actual).toEqual([{ id: 'userRoles', name: 'userRoles', checked: false }]);
  });

  it('should return mapped array', () => {
    const actual = component['createSuggestions'](['suggestion']);

    expect(actual).toEqual([{ name: 'suggestion', id: '0' }]);
  });

  describe('getCheckedData', () => {
    it('should return input data', () => {
      const input = [{ id: 'id', name: 'name' }];
      const option = { id: 'id2', name: 'name2' };

      const actual = component['getCheckedData'](input, option);

      expect(actual).toEqual(input);
    });

    it('should return checked True', () => {
      const input = [{ id: 'id', name: 'name' }];
      const option = { id: 'id', name: 'name' };

      const expected = [{ id: 'id', name: 'name', checked: true }];
      const actual = component['getCheckedData'](input, option);

      expect(actual).toEqual(expected);
    });
  });

  describe('getFormData', () => {
    it('should return one item', () => {
      const items = [
        { id: 'id', name: 'name', checked: true },
        { id: 'id1', name: 'name2' }
      ];

      const actual = component['getFormData'](items);

      expect(actual).toEqual([{ id: 'id', name: 'name' }]);
    });

    it('should return no items', () => {
      const items = [
        { id: 'id', name: 'name' },
        { id: 'id1', name: 'name2' }
      ];

      const actual = component['getFormData'](items);

      expect(actual).toEqual([]);
    });
  });

  describe('findItems', () => {
    const items = [
      { id: 'id', name: 'name' },
      { id: 'id2', name: 'name2' }
    ];

    it('should return empty array', () => {
      const actual = component['findItems'](items, '', '');

      expect(actual).toEqual([]);
    });

    it('should return name2 item', () => {
      const actual = component['findItems'](items, 'name2, name3', 'name');

      expect(actual).toEqual([{ id: 'id2', name: 'name2' }]);
    });
  });
});
