import { TestBed } from '@angular/core/testing';

import { OvertimeService } from './overtime.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OvertimeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: OvertimeService = TestBed.get(OvertimeService);
    expect(service).toBeTruthy();
  });
});
