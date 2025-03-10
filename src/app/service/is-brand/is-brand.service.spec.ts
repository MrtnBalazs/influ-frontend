import { TestBed } from '@angular/core/testing';

import { IsBrandService } from './is-brand.service';

describe('IsBrandService', () => {
  let service: IsBrandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsBrandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
