import { TestBed } from '@angular/core/testing';

import { PollService } from './poll.service';
import { DataService } from "../_shared/services/data.service";
import {HttpClientModule} from "@angular/common/http";
import {CleanObjPipe} from "../_shared/pipes/clean-obj.pipe";

describe('PollService', () => {
  let service: PollService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ DataService, CleanObjPipe, PollService ]
    });
    service = TestBed.inject(PollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
