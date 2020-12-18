import {ComponentFixture, TestBed, tick} from '@angular/core/testing';

import { PollEditComponent } from './poll-edit.component';
import {CoreModule} from "../../_core/core.module";
import {RouterTestingModule} from "@angular/router/testing";
import {PollService} from "../poll.service";
import {PollListComponent} from "../poll-list/poll-list.component";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";

describe('PollEditComponent', () => {
  let component: PollEditComponent;
  let fixture: ComponentFixture<PollEditComponent>;

  let mockPollService;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  const addedPollId: number = 1;

  beforeEach(async () => {
    mockPollService = jasmine.createSpyObj(['add']);
    mockPollService.add.and.returnValue(of(addedPollId));

    await TestBed.configureTestingModule({
      imports: [ CoreModule, FormsModule, RouterTestingModule ],
      declarations: [ PollEditComponent ],
      providers: [
        { provide: PollService, useValue: mockPollService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('스토리 2. 투표 생성자는 제목을 입력할 수 있어야 한다:', () => {
    it('2-1. 제목을 입력할 수 있는 input box 가 있다.', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('input[name="subject"]')).toBeTruthy();
    });
  });


  describe('스토리 3. 투표를 생성하면 항목이 기본으로 3개가 생성되어야 한다.: ', () => {
    it('3-1. 항목이 3개가 생성되어 있는가?', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelectorAll('.poll-item').length).toBe(3);
    });
  });

  describe('스토리 5. 투표 생성자는 투표를 저장할 수 있어야 한다:', () => {

    it('5-1. 투표 저장(등록) 버튼이 있다.', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('#save-btn')).toBeTruthy();
    });

    it('5-2. save 메소드가 정상 작동한다.', () => {
      component.poll.subject = '투표 테스트';
      component.poll.items[0].content = "항목 1";
      component.poll.items[1].content = "항목 2";
      component.poll.items[2].content = "항목 3";

      component.save();
      fixture.detectChanges();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/polls', addedPollId, 'view']);
    });
  });

  describe('스토리 12. 투표 생성자는 투표 기간을 설정할 수 있다(시작, 종료).: ', () => {
    let compiled: any;

    beforeEach(() => {
      compiled = fixture.nativeElement;
    });

    it('12-1. 시작일 input box 가 있다.', () => {
      expect(compiled.querySelector('input[name="beginDate"]')).toBeTruthy();
    });
    it('12-2. 종료일 input box 가 있다.', () => {
      expect(compiled.querySelector('input[name="endDate"]')).toBeTruthy();
    });
    it('12-3. 시작일 input value를 변경할 수 있다.', () => {
      let beginInput = compiled.querySelector('input[name="beginDate"]');
      beginInput.value = '2020-01-01';
      beginInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(beginInput.value).toEqual('2020-01-01');
    });
  });

});
