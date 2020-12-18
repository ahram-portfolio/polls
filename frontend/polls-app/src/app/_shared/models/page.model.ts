export class Page {

  private readonly _contents = [];
  private readonly _page: number = 0;
  private readonly _totalPages: number = 0;

  constructor(res?: any) {
    if (res) {
      this._contents = res.contents;
      this._page = res.page;
      this._totalPages = res.totalPages;
    }
  }

  get contents(): any[] {
    return this._contents;
  }
  get contentsCnt(): number {
    return this._contents.length;
  }
  get page(): number {
    return this._page;
  }
  get totalPages(): number {
    return this._totalPages;
  }

}
