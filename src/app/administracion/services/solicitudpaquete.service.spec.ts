import { TestBed } from '@angular/core/testing';

import { SolicitudpaqueteService } from './solicitudpaquete.service';

describe('SolicitudpaqueteService', () => {
  let service: SolicitudpaqueteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudpaqueteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
