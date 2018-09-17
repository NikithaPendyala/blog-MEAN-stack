import { TestBed, inject } from '@angular/core/testing';

import { PostservService } from './postserv.service';

describe('PostservService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostservService]
    });
  });

  it('should be created', inject([PostservService], (service: PostservService) => {
    expect(service).toBeTruthy();
  }));
});
