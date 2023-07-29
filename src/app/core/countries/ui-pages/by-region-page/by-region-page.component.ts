import { Component, OnInit } from '@angular/core';

import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';
import { CountriesService } from '../../services/countries.service';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {

  //
  // Public properties
  //

  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;
  
  //
  // Lifecicle
  //

  constructor(private countriesService: CountriesService) {

  }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheMemoryStorage.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheMemoryStorage.byRegion.region;
  }

  //
  // ...
  //

  public searchByRegion(region: Region): void {
    this.selectedRegion = region;
    
    this.countriesService.searchRegion(region)
      .subscribe((countries) => {
        this.countries = countries;
      })
  }

}
