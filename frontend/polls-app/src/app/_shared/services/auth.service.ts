import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private dataService: DataService
  ) {
    this.dataService
      .get(`my`, null)
      .subscribe(myInfo => {
        this._user.next(myInfo.name);
      });
  }

  get user(): Observable<string> {
    return this._user;
  }

}
