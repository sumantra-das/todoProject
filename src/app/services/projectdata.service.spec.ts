import { TestBed } from '@angular/core/testing';

import { ProjectdataService } from './projectdata.service';

describe('ProjectdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectdataService = TestBed.get(ProjectdataService);
    expect(service).toBeTruthy();
  });
});
