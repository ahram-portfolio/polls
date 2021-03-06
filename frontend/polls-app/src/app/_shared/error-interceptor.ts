import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(
        catchError(error => {
          const errorMessage = error.error.message;
          if (errorMessage.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/))
            alert(error.error.message);
          return throwError(error);
        })
      );
  }

}
