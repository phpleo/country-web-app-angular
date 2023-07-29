import { Component, OnInit } from '@angular/core';

import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {

  //
  // Public properties
  //

  public countries: Country[] = [];
  public initialValue: string = '';

  //
  // Lifecycle
  //

  constructor(private countriesService: CountriesService) {

  }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheMemoryStorage.byCountries.countries;
    this.initialValue = this.countriesService.cacheMemoryStorage.byCountries.term;
  }

  //
  // search
  //

  public searchByCountry(term: string): void {
    this.countriesService.searchCountry(term)
      .subscribe((countries) => {
        this.countries = countries;
      })
  }

}
