import { Directive, Input, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[productInfo]',
  standalone: false
})
export class ProductInfoDirective {

  constructor(public viewContainerRef:ViewContainerRef) { }

}
