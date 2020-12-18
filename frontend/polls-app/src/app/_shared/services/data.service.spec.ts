import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import {HttpClientModule} from "@angular/common/http";
import {HttpTestingController} from "@angular/common/http/testing";
import {CleanObjPipe} from "../pipes/clean-obj.pipe";

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ DataService, CleanObjPipe ]
    });
    service = TestBed.inject(DataService);});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
