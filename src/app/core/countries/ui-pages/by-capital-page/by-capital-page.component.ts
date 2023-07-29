import { Component, OnInit } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {

  //
  // Public properties
  //

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';
  
  //
  // Lifecycle
  //

  constructor(private countriesService: CountriesService) {
  
  }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheMemoryStorage.byCapital.countries;
    this.initialValue = this.countriesService.cacheMemoryStorage.byCapital.term;
  }

  //
  // Search actions
  //

  public searchByCapital(term: string): void {
    this.isLoading = true;

    this.countriesService.searchCapital(term)
      .subscribe((countries) => {
        this.countries = countries;
        this.isLoading = false;
      })
  }

}
