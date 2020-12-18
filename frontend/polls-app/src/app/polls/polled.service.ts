import { Injectable } from '@angular/core';
import {DataService} from "../_shared/services/data.service";

@Injectable({
  providedIn: 'root'
})
export class PolledService {

  private _url: string = 'polls';

  constructor(
    private dataService: DataService
  ) { }

  polled(
    id: number,
    itemId: number
  ) {
    return this.dataService.update(
      `${this._url}/${id}/polled`,
      [ itemId ]
    );
  }

}
