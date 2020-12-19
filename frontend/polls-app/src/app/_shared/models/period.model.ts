export class Period {
  private _beginDate: string = '';
  private _endDate: string = '';
  private _status: string = '';

  constructor(res?: any) {
    if (res) {
      this._beginDate = res.beginDate;
      this._endDate = res.endDate;
      this._status = res.koStatus || res.status;
    }
  }

  get beginDate(): string {
    return this._beginDate;
  }
  get endDate(): string {
    return this._endDate;
  }
  get status(): string {
    return this._status;
  }
  get isOpened(): boolean {
    return (this.status === '진행중');
  }
  get isEnded(): boolean {
    return (this.status === '종료');
  }

  set beginDate(beginDate: string) {
    // 적절하지 않은 날짜일 경우 리턴.
    if (!this.isValidDateString(beginDate))
      return;
    this._beginDate = beginDate;
    this._status = '';
  }

  set endDate(endDate: string) {
    if (!this.isValidDateString(endDate))
      return;
    this._endDate = endDate;
    this._status = '';
  }

  mapToForm() {
    return {
      beginDate: this._beginDate,
      endDate: this._endDate
    };
  }



  private isValidDateString(dateString: string) {
    return !isNaN(new Date(dateString).getTime());
  }


}
