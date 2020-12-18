import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollViewComponent } from './poll-view.component';
import {CoreModule} from "../../_core/core.module";
import {RouterTestingModule} from "@angular/router/testing";
import {PollService} from "../poll.service";
import {PolledService} from "../polled.service";
import {AuthService} from "../../_shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {of} from "rxjs";
import {Poll} from "../../_shared/models/poll.model";
import {dummy} from "../../../../dummy-data";

describe('PollViewComponent', () => {
  let component: PollViewComponent;
  let fixture: ComponentFixture<PollViewComponent>;

  let mockAuthService;
  let mockPollService;
  let mockPolledService;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  let mockActivatedRoute = {
    params: of({ id: dummy.poll.id.toString() })
  }

  const userName: string = dummy.user.name;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj(['user']);
    mockAuthService.user = of(userName);

    mockPollService = jasmine.createSpyObj(['get', 'delete']);
    mockPollService.get.and.returnValue(of(new Poll(dummy.poll)));
    mockPollService.delete.and.returnValue(of());

    mockPolledService = jasmine.createSpyObj(['polled']);
    mockPolledService.polled.and.returnValue();

    await TestBed.configureTestingModule({
      imports: [ CoreModule, RouterTestingModule ],
      declarations: [ PollViewComponent ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: PollService, useValue: mockPollService },
        { provide: PolledService, useValue: mockPolledService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('스토리 6. 투표 생성자는 투표를 삭제할 수 있어야 한다.: ', () => {

    it('6-1. 투표 생성자 정보를 가져오고 있는가?', () => {
      const compiled = fixture.nativeElement;
      expect(component.poll.creator).toBe(userName);
    });

    it('6-2. 투표 생성자와 로그인한 사용자 정보가 같은가?', () => {
      const compiled = fixture.nativeElement;
      expect(component.isMyPoll()).toBe(true);
    });

    it('6-3. 투표 생성자와 로그인한 사용자 정보가 같을 때, 삭제 버튼이 보여야 한다.', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('#del-btn')).toBeTruthy();
    });

    it('6-4. 투표 생성자와 로그인한 사용자 정보가 다를 때, 삭제 버튼이 안 보여야 한다.', () => {
      // 투표 정보를 변경
      let poll = Object.assign({}, dummy.poll);
      poll.creator = '노노노노노';
      component.poll = new Poll(poll);
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('#del-btn')).toBeFalsy();
    });

    it('6-5. delPoll 메소드가 정상 작동 하는가?', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      component.delPoll();
      fixture.detectChanges();

      expect(window.confirm).toHaveBeenCalled();
      expect(window.confirm).toHaveBeenCalledWith('투표를 삭제하시겠어요?');
      //expect(mockRouter.navigate).toHaveBeenCalledWith(['/polls']);
    });
  });

  describe('기간이 종료된 투표 테스트', () => {
    beforeEach(() => {
      let poll = Object.assign({}, dummy.poll);
      poll.period = {
        beginDate: '2020-01-01',
        endDate: '2020-10-31',
        koStatus: '종료'
      }
      component.poll = new Poll(poll);
      fixture.detectChanges();
    });

    describe('스토리 11. 사용자는 투표 결과를 텍스트로 확인할 수 있어야 한다.:', () => {

      it('11-1. 기간이 종료된 투표이다.', () => {
        expect(component.poll.period.status).toEqual('종료');
      })

      it('11-2. 투표 결과를 확인하는 엘리먼트가 나타난다.', () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelectorAll('.poll-results').length).toBeGreaterThan(0);
      });

      it('11-3. 투표 결과가 정상적으로 나타난다.', () => {
        const compiled = fixture.nativeElement;

        const itemText = component.poll.mostPolledItems[0].content;
        expect(compiled.querySelector('.poll-results').textContent).toContain(itemText);
      });
    });

    describe('스토리 12. 사용자는 종료시간이 지난 투표는 결과보기만 할 수 있다.: backend에서 처리', () => {

    });
  });

});
