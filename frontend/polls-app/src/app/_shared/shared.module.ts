import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CleanObjPipe } from './pipes/clean-obj.pipe';
import { NumToArrayPipe } from './pipes/num-to-array.pipe';
import { PreventHrefDirective } from './directives/prevent-href.directive';
import {DataService} from "./services/data.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ErrorInterceptor} from "./error-interceptor";

const COMPONENTS = [
  PaginationComponent
];
const PIPES = [
  CleanObjPipe,
  NumToArrayPipe
];
const DIRECTIVES = [
  PreventHrefDirective
]


@NgModule({
  declarations: [ COMPONENTS, PIPES, DIRECTIVES ],
  exports: [ COMPONENTS, PIPES, DIRECTIVES ],
  imports: [
    CommonModule, HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    COMPONENTS,
    PIPES,
    DIRECTIVES,
    DataService
  ]
})
export class SharedModule { }
