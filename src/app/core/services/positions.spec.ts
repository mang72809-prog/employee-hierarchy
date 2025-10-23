import { TestBed } from '@angular/core/testing';
import { PositionsService } from './positions'; // ✅ Correct import

describe('PositionsService', () => {      // ✅ Match the service name
  let service: PositionsService;          // ✅ Use correct type

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PositionsService); // ✅ Inject service
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
