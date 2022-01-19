import { TestBed } from '@angular/core/testing';

import { IoserviceService } from './ioservice.service';

describe('IoserviceService', () => {
  let service: IoserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IoserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
