import { TestBed } from '@angular/core/testing';

import { CuitValidatorService } from './cuit-validator.service';

describe('CuitValidatorService', () => {
  let service: CuitValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuitValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
