import { EmployeesListModule } from './employees-list.module';

describe('EmployeesListModule', () => {
  let employeesListModule: EmployeesListModule;

  beforeEach(() => {
    employeesListModule = new EmployeesListModule();
  });

  it('should create an instance', () => {
    expect(employeesListModule).toBeTruthy();
  });
});
