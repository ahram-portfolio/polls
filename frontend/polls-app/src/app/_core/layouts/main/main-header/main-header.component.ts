import { Component } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent {

  public title: string = '';

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe(navigateEvent => {
      if (navigateEvent instanceof NavigationEnd) {
        this.setTitle(navigateEvent.url);
      }
    });
  }

  private setTitle(url: string) {
    const titles = [
      { pattern: '/polls/[0-9]+/view', name: '투표 정보' },
      { pattern: '/polls/add', name: '투표 등록' },
      { pattern: '/polls', name: '투표 목록' }
    ];

    for (const title of titles) {
      if (url.match(title.pattern)) {
        this.title = title.name;
        break;
      }
    }
  }

}
