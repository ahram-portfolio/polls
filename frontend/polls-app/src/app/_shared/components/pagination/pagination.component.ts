import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Page} from "../../models/page.model";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  private _page: number = 0;
  private _totalPages = 0;

  public barPage = 0;
  public maxBarPage = 0;
  public startPageNo = 0;

  @Input() pageCnt: number = 5;
  @Output() pageChange: any = new EventEmitter();

  @Input() set pageObj(pageObj: Page) {
    this._page = pageObj.page;
    if (this._page === 0)
      this.setInitParams();
    this._totalPages = pageObj.totalPages;
    this.setMaxBarPage();
  }

  get page() {
    return this._page;
  }
  get totalPages() {
    return this._totalPages;
  }


  constructor() { }


  changePage(page: number) {
    this._page = page;
    this.pageChange.emit(this._page);
  }

  changeBarPage(barPage: number) {
    this.barPage = barPage;
    this.startPageNo = (this.pageCnt * this.barPage);
    this.changePage(this.startPageNo);
  }

  private setInitParams(): void {
    this.barPage = 0;
    this.startPageNo = 0;
  }

  private setMaxBarPage() {
    let totalPages = this.totalPages;
    if ((this.totalPages % this.pageCnt) === 0) { totalPages = totalPages - 1; }

    this.maxBarPage = Math.floor(totalPages / this.pageCnt);
  }
}
