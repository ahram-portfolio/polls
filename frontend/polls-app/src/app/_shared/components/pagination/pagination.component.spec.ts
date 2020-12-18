import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import {NumToArrayPipe} from "../../pipes/num-to-array.pipe";

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  let numToArrayPipe: NumToArrayPipe;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationComponent, NumToArrayPipe ]
    })
    .compileComponents();
    numToArrayPipe = new NumToArrayPipe();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
