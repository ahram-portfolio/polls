export class PollItem {
  private readonly _id: number = 0;
  public content: string = '';
  private readonly _polledCnt: number = 0;
  private readonly _isPolled: boolean = false;

  constructor(res?: any) {
    if (res) {
      this._id = res.ordering;
      this.content = res.content;
      this._isPolled = res.isPolled;
      this._polledCnt = res.cnt;
    }
  }

  get id() {
    return this._id;
  }
  get polledCnt() {
    return this._polledCnt;
  }
  get isPolled() {
    return this._isPolled;
  }


  mapToForm() {
    return this.content;
  }
  isEqual(item: PollItem): boolean {
    return this.id !== 0 && item.id !== 0 && (this._id === item.id);
  }

}
