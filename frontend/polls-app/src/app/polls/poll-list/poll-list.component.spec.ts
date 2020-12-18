import {async, ComponentFixture, inject, TestBed, tick} from '@angular/core/testing';

import { PollListComponent } from './poll-list.component';
import {RouterTestingModule} from "@angular/router/testing";
import {SharedModule} from "../../_shared/shared.module";
import {CoreModule} from "../../_core/core.module";
import {of} from "rxjs";
import {Page} from "../../_shared/models/page.model";
import {Poll} from "../../_shared/models/poll.model";
import {dummy} from "../../../../dummy-data";
import {PollService} from "../poll.service";
import {PolledService} from "../polled.service";
import {Router, RouterLinkWithHref} from "@angular/router";
import {PollViewComponent} from "../poll-view/poll-view.component";

describe('PollListComponent', () => {
  let component: PollListComponent;
  let fixture: ComponentFixture<PollListComponent>;

  let mockPollService;
  let mockPolledService;
  let router: Router;

  let polls: any = Object.assign({}, dummy.polls);
  polls.contents = polls.contents.map((e: any) => new Poll(e));
  const pollsCnt = polls.contents.length;

  beforeEach(async () => {
    mockPollService = jasmine.createSpyObj(['search', 'get']);

    mockPollService.search.and.returnValue(of(new Page(polls)));
    mockPollService.get.and.returnValue(of(new Poll(Object.assign({}, dummy.poll))));

    mockPolledService = jasmine.createSpyObj(['polled']);
    mockPolledService.polled.and.returnValue(of());


    await TestBed.configureTestingModule({
      imports: [ SharedModule, CoreModule, RouterTestingModule.withRoutes([]) ],
      declarations: [ PollListComponent, PollViewComponent ],
      providers: [
        { provide: PollService, useValue: mockPollService },
        { provide: PolledService, useValue: mockPolledService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('스토리 1. 사용자는 투표를 생성할 수 있어야 한다: ', () => {
    it(' 1-1. 등록버튼이 있다.', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('#add-btn')).toBeTruthy();
    });
  });

  describe('스토리 7. 사용자는 만들어진 투표 리스트를 볼 수 있어야 한다: ', () => {
    it('7-1. search 메소드가 정상 작동 한다.', () => {
      expect(component.page.contentsCnt).toBe(pollsCnt);
    });

    it('7-2. 검색결과와 화면에 나타나는 카드 개수가 일치한다.', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelectorAll('.card-list').length).toBe(pollsCnt);
    });
  });

  describe('스토리 8. 사용자는 투표 리스트에서 제목, 생성자, 기간, 진행 중 여부를 확인 할 수 있어야 한다.: ', () => {
    let compiled: any;
    const pollIdx = 0;
    const poll = polls.contents[pollIdx]

    beforeEach(() => {
      compiled = fixture.nativeElement;
    });

    it('8-1. 제목을 확인할 수 있다.', () => {
      expect(compiled.querySelectorAll('.subject').length).toBe(pollsCnt);
      expect(compiled.querySelectorAll('.subject')[pollIdx].textContent).toBeTruthy();
      expect(compiled.querySelectorAll('.subject')[pollIdx].textContent).toContain(poll.subject);
    });
    it('8-2. 생성자를 확인할 수 있다.', () => {
      expect(compiled.querySelectorAll('cite').length).toBe(pollsCnt);
      expect(compiled.querySelectorAll('cite')[pollIdx].textContent).toBeTruthy();
      expect(compiled.querySelectorAll('cite')[pollIdx].textContent).toContain(poll.creator);
    });
    it('8-3. 기간을 확인할 수 있다.', () => {
      const beginDate = new Date(poll.period.beginDate);
      const year = beginDate.getFullYear().toString().substr(2);
      let month = (beginDate.getMonth() + 1).toString();
      if (month.length < 2) month = '0' + month;
      let date = beginDate.getDate().toString();
      if (date.length < 2) date = '0' + date;

      expect(compiled.querySelectorAll('.period').length).toBe(pollsCnt);
      expect(compiled.querySelectorAll('.period')[pollIdx].textContent).toBeTruthy();
      expect(compiled.querySelectorAll('.period')[pollIdx].textContent).toContain(`${year}${month}${date}`);
    });
    it('8-4. 진행 중 여부를 확인할 수 있다.', () => {
      expect(compiled.querySelectorAll('.expired-stamp').length).toBe(1);
      expect(compiled.querySelectorAll('.yet-stamp').length).toBe(1);
      expect(compiled.querySelectorAll('.fa-vote-yea').length).toBe(1);
    });
  });

  describe('스토리 9. 사용자는 투표 리스트에서 특정 투표를 클릭시 투표내용 상세보기를 할 수 있다.: ', () => {
    it('9-1. 투표 카드 클릭 시, 투표 정보 화면으로 이동한다.', () => {
      router = TestBed.inject(Router);
      fixture.detectChanges();
      const spy = spyOn(router, 'navigateByUrl');

      const poll = component.page.contents[0];

      const compiled = fixture.nativeElement;
      const card = compiled.querySelectorAll('.card-list')[0];
      card.click();

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(
        router.createUrlTree([`/polls/${poll.id}/view`]),
        jasmine.anything()
      );
    });
  });

  describe('스토리 10. 사용자는 투표 리스트에서 진행 중인 투표에 투표할 수 있다.: ', () => {
    it('10-1. 진행 중인 투표 정보에서 항목들을 확인할 수 있다.', () => {
      const compiled = fixture.nativeElement;
      const openIcon = compiled.querySelector('.fa-vote-yea');
      openIcon.click();
      fixture.detectChanges();

      expect(compiled.querySelectorAll('ol > li').length).toBeGreaterThan(0);
    });

    it('10-2. 항목에 투표할 수 있다.', () => {
      spyOn(component, 'polled');

      const compiled = fixture.nativeElement;
      const item = compiled.querySelectorAll('ol > li:not(.polled)')[0];
      item.click();
      fixture.detectChanges();

      expect(component.polled).toHaveBeenCalled();
    });
  });
});
