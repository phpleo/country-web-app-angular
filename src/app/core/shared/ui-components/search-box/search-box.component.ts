import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  
  //
  // Private properties
  //

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  //
  // Public properties
  //

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>;

  @Output()
  public onDebounceValue: EventEmitter<string> = new EventEmitter<string>;

  // @ViewChild('txtInput')
  // public txtInput!: ElementRef<HTMLInputElement>;

  //
  // Lifecicle
  //

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe((value) => {
        console.log('debouncer value', value);
        this.onDebounceValue.emit(value);
      })
  }

  ngOnDestroy(): void {
    // Cleaning the Observable Subscription when the component is destroyed.
    this.debouncerSubscription?.unsubscribe();
  }

  //
  // ...
  //

  /**
   * (keydown.enter)="onEmitValue(txtInput.value)"
   * 
   * @param value 
   */
  public onEmitValue(value: string): void {
    // console.log('SearchBoxComponent.onSearchValue')
    // const term: string = this.txtInput.nativeElement.value;
    
    this.onValue.emit(value);

    // this.txtInput.nativeElement.value = '';
  }

  public onKeyPress(searchTerm: string): void {
    this.debouncer.next(searchTerm);
  }
}
