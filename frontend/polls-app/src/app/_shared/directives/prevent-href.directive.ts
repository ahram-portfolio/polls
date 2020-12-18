import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: 'a[href]'
})
export class PreventHrefDirective {

  constructor() { }

  @HostListener('click', ['$event'])
  preventClick(event: any) {
    event.preventDefault();
  }

}
