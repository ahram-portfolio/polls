import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CleanObjPipe } from '../pipes/clean-obj.pipe';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _apiUrl = environment.baseUrl.api;

  constructor(
    private http: HttpClient,
    private cleanObjPipe: CleanObjPipe
  ) { }


  public add(
      url: string,
      body: any,
      params?: any,
      options?: object
    ): Observable<any> {

      return this.http.post(
        `${this._apiUrl}/${url}`,
        body,
        (options) ? options : this.getOptions(params)
      );

    }

    public update(
      url: string,
      body: any
    ): Observable<any> {

      return this.http.put(
        `${this._apiUrl}/${url}`,
        body,
        this.getOptions(null)
      );

    }

    public get(
      url: string,
      params?: any
    ): Observable<any> {
      return this.http.get(
        `${this._apiUrl}/${url}`,
        this.getOptions(params)
      );
    }

    public search(
      url: string,
      params?: any
    ): Observable<any> {

      return this.http.get(
        `${this._apiUrl}/${url}`,
        this.getOptions(params)
      );

    }

    public delete(
      url: string,
      params ?: any
    ) {

      return this.http.delete(
        `${this._apiUrl}/${url}`,
        this.getOptions(params)
      );

    }



    private getOptions(params: any): any {
      let options: any = {
        headers: new HttpHeaders()
          .set('Access-Control-Allow-Origin', '*')
          .set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
          .set('Access-Control-Allow-Headers', 'Origin, Content-Type')
          .set('content-type', 'application/json'),
      };

      if (params)
        options.params = this.cleanObjPipe.transform(params);

      return options;
    }
}
