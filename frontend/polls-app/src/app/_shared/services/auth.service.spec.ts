import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {of} from "rxjs";
import {DataService} from "./data.service";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared.module";

describe('AuthService', () => {
  let service: AuthService;
  let mockDataService;

  beforeEach(() => {
    mockDataService = jasmine.createSpyObj(['get']);
    mockDataService.get.and.returnValue(of({ id: 1, name: '늘네생각만해'} ));

    TestBed.configureTestingModule({
      imports: [ HttpClientModule, SharedModule ],
      providers: [
        AuthService,
        { provide: DataService, useVale: mockDataService }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
