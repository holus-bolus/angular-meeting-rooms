import { EmployeeModule } from './employee.module';

describe('EmployeeCardModule', () => {
  let employeeCardModule: EmployeeModule;

  beforeEach(() => {
    employeeCardModule = new EmployeeModule();
  });

  it('should create an instance', () => {
    expect(employeeCardModule).toBeTruthy();
  });
});
