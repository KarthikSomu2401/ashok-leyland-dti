import { TestBed } from '@angular/core/testing';

import { TestStatusService } from './test-status.service';

describe('TestServiceService', () => {
  let service: TestStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
