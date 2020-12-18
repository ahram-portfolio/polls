import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './_core/layouts/main/main/main.component';
import { PollListComponent } from './polls/poll-list/poll-list.component';
import { PollEditComponent } from './polls/poll-edit/poll-edit.component';
import { PollViewComponent } from './polls/poll-view/poll-view.component';

const routes: Routes = [
  {
    path: 'polls',
    component: MainComponent,
    children: [
      { path: '', component: PollListComponent },
      { path: 'add', component: PollEditComponent },
      {
        path: ':id',
        children: [
          { path: 'view', component: PollViewComponent }
        ]
      }
    ]
  },
  { path: '**' , redirectTo: 'polls' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
