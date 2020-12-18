import { Injectable } from '@angular/core';
import { DataService } from "../_shared/services/data.service";
import {map} from "rxjs/operators";
import {Poll} from "../_shared/models/poll.model";
import {Page} from "../_shared/models/page.model";

@Injectable({
  providedIn: 'root'
})
export class PollService {

  private _url: string = 'polls';

  constructor(
    private dataService: DataService
  ) { }


  search(page: number) {
    return this.dataService.search(
      `${this._url}`,
      { page: page }
    ).pipe(
      map(res => {
        res.contents = res.contents.map((e: any) => new Poll(e));
        return new Page(res);
      })
    )
  }

  get(id: number) {
    return this.dataService.get(
      `${this._url}/${id}`,
      null,
    ).pipe(
      map(res => new Poll(res))
    );
  }

  add(poll: Poll) {
    return this.dataService.add(
      `${this._url}`,
      poll.mapToForm()
    );
  }

  delete(id: number) {
    return this.dataService.delete(
      `${this._url}/${id}`,
      null
    );
  }

}
