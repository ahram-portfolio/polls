import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { MainHeaderComponent } from './layouts/main/main-header/main-header.component';
import { MainFooterComponent } from './layouts/main/main-footer/main-footer.component';
import { MainComponent } from './layouts/main/main/main.component';


const LAYOUT_COMPONENTS = [
  MainFooterComponent,
  MainHeaderComponent,
  MainComponent
];

@NgModule({
  declarations: [
    LAYOUT_COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CoreModule { }
