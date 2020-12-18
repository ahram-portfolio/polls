import {Component, OnInit} from '@angular/core';
import {Poll} from "../../_shared/models/poll.model";
import {PollService} from "../poll.service";
import {Router} from "@angular/router";
import {PollItem} from "../../_shared/models/poll-item.model";

@Component({
  selector: 'app-poll-edit',
  templateUrl: './poll-edit.component.html',
  styleUrls: ['./poll-edit.component.css']
})
export class PollEditComponent implements OnInit {

  public poll: Poll = new Poll();
  public focusedItem: PollItem = new PollItem();


  // View Variable
  public minDate = new Date();
  private _initItemCnt = 3;

  constructor(
    private router: Router,
    private pollService: PollService
  ) { }

  ngOnInit() {
    for (let i=0; i < this._initItemCnt; i++) {
      this.poll.addItem();
    }
  }

  setFocusedItem(item?: PollItem) {
    this.focusedItem = item || new PollItem();
  }

  save() {
    this.pollService.add(this.poll)
      .subscribe(pollId => {
        this.router.navigate(['/polls', pollId, 'view']);
      });
  }

}
