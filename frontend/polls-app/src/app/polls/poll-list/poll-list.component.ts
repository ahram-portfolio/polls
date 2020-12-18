import { Component, OnInit } from '@angular/core';
import {PollService} from "../poll.service";
import {Page} from "../../_shared/models/page.model";
import {Poll} from "../../_shared/models/poll.model";
import {PolledService} from "../polled.service";

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.css']
})
export class PollListComponent implements OnInit {

  private _page: Page = new Page();
  public selectedPoll: Poll = new Poll();

  get page() {
    return this._page;
  }

  constructor(
    private pollService: PollService,
    private polledService: PolledService
  ) {}

  ngOnInit(): void {
    this.search(0);
  }

  search(page: number) {
    this.pollService.search(page)
      .subscribe(page => {
        this._page = page;

        const openedPolls
          = this._page.contents
          .filter(e => e.isOpened);
        if (openedPolls.length > 0)
          this.selectPoll(openedPolls[0]);
      });
  }

  selectPoll(poll: Poll) {
    if (!poll.isExpired && !this.selectedPoll.isEqual(poll))
      this.setSelectedPoll(poll.id);
  }

  polled(itemNo: number) {
    this.polledService.polled(
      this.selectedPoll.id,
      itemNo
    ).subscribe(res => {
      this.setSelectedPoll(this.selectedPoll.id);
    });
  }

  private setSelectedPoll(pollId: number) {
    this.pollService.get(pollId)
      .subscribe(selectedPoll => {
        this.selectedPoll = selectedPoll;
      });
  }

}
