import { TestBed } from '@angular/core/testing';

import { NotaService } from './notas.service'; 

describe('NotaService', () => {
  let service: NotaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});