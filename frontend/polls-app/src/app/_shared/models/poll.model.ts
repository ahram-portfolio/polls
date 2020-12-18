import {PollItem} from "./poll-item.model";
import {Period} from "./period.model";

export class Poll {
  private readonly _id: number = 0;
  private readonly _creator: string = '';
  private readonly _polledTotalCnt: number = 0;

  public subject: string = '';
  public period: Period = new Period(null);
  public items: PollItem[] = [];


  // View Variable
  private readonly _itemLimitCnt = {
    min: 2,
    max: 5
  };


  constructor(res?: any) {
    if (res) {
      this._id = res.id;
      this.subject = res.subject;
      this.period = new Period(res.period);
      this._creator = res.creator;

      if (res.polled) {
        this.items
          = res.polled.items
          .map((e: any) => new PollItem(e));
        this._polledTotalCnt = res.polled.totalCnt;
      }
    }
  }

  get id() {
    return this._id;
  }
  get creator() {
    return this._creator;
  }
  get polledTotalCnt() {
    return this._polledTotalCnt;
  }
  get mostPolledItems() {
    const maxPolledCnt = Math.max.apply(Math, this.items.map(item => item.polledCnt));
    return this.items.filter(item => item.polledCnt === maxPolledCnt);
  }
  get isExpired() {
    return this.period.isEnded;
  }
  get isOpened() {
    return this.period.isOpened;
  }

  getPolledPercentByItem(itemCnt: number): number {
    if (this._polledTotalCnt === 0)
      return 0;
    return Math.floor((itemCnt / this._polledTotalCnt) * 100);
  }


  canAddItem(): boolean {
    return (this.items.length < this._itemLimitCnt.max);
  }

  addItem() {
    if (this.items.length < this._itemLimitCnt.max)
      this.items.push(
        new PollItem({
          ordering: (this.items.length > 0) ? this.items[this.items.length -1].id + 1: 1
        })
      );
  }

  delItem(idx: number) {
    this.items.splice(idx, 1);

    if (this.items.length < this._itemLimitCnt.min)
      this.addItem();
  }



  mapToForm() {
    return {
      subject: this.subject,
      items: this.items.map(e => e.mapToForm()),
      period: this.period.mapToForm()
    };
  }

  isEqual(poll: Poll): boolean {
    return (this.id === poll.id);
  }

}
