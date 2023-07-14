import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent {

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>;

  // @ViewChild('txtInput')
  // public txtInput!: ElementRef<HTMLInputElement>;

  public onEmitValue(value: string): void {
    // console.log('SearchBoxComponent.onSearchValue')
    // const term: string = this.txtInput.nativeElement.value;
    
    this.onValue.emit(value);

    // this.txtInput.nativeElement.value = '';
  }
}
