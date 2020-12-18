import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PollService} from "../poll.service";
import {Poll} from "../../_shared/models/poll.model";
import {PolledService} from "../polled.service";
import {AuthService} from "../../_shared/services/auth.service";

@Component({
  selector: 'app-poll-view',
  templateUrl: './poll-view.component.html',
  styleUrls: ['./poll-view.component.css']
})
export class PollViewComponent implements OnInit {

  public poll: Poll = new Poll();

  private _myName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private pollService: PollService,
    private polledService: PolledService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id)
        this.getPoll(+params.id);
    });

    this.authService.user.subscribe(userName => {
      this._myName = userName;
    });
  }

  isMyPoll() {
    return (this.poll.creator === this._myName);
  }

  getPoll(pollId: number) {
    this.pollService.get(pollId)
      .subscribe(poll => {
        this.poll = poll;
      });
  }

  polled(itemId: number) {
    this.polledService.polled(
      this.poll.id,
      itemId
    ).subscribe(res => {
      this.getPoll(this.poll.id);
    });
  }

  delPoll() {
    if (confirm("투표를 삭제하시겠어요?"))
      this.pollService.delete(this.poll.id)
        .subscribe(res => {
          this.router.navigate(['/polls']);
        });
  }

}
