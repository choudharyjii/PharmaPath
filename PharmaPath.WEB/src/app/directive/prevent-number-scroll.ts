import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[PreventScroll]',
    standalone: true
})
export class PreventScroll {
  @HostListener('wheel', ['$event'])
  handleWheelEvent(event: WheelEvent): void {
    // Prevent the default behavior (changing the number value)
    event.preventDefault();

    // Optionally, you can scroll the page here if needed
    // window.scrollBy(0, event.deltaY);
  }
}
