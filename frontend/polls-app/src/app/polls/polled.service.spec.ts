import { TestBed } from '@angular/core/testing';

import { PolledService } from './polled.service';
import {DataService} from "../_shared/services/data.service";
import {HttpClientModule} from "@angular/common/http";
import {CleanObjPipe} from "../_shared/pipes/clean-obj.pipe";

describe('PolledService', () => {
  let service: PolledService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ DataService, CleanObjPipe, PolledService ]
    });
    service = TestBed.inject(PolledService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
