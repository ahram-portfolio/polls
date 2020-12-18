import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PollListComponent } from './poll-list/poll-list.component';
import { PollEditComponent } from './poll-edit/poll-edit.component';
import { PollViewComponent } from './poll-view/poll-view.component';
import { SharedModule } from "../_shared/shared.module";
import {PollService} from "./poll.service";
import {PolledService} from "./polled.service";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../_shared/services/auth.service";

const POLL_COMPONENTS = [
  PollListComponent,
  PollEditComponent,
  PollViewComponent
];

@NgModule({
  declarations: [
    POLL_COMPONENTS
  ],
  imports: [
    CommonModule, FormsModule,
    RouterModule,
    SharedModule
  ],
  providers: [
    AuthService,
    PollService,
    PolledService
  ]
})
export class PollModule { }
