import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  //
  // Public properties
  //
  
  public country?: Country;

  //
  // constructor
  //

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private countriesService: CountriesService) {    
  
  }

  //
  // Life cicle component
  //

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.countriesService.searchByAlphaCode(id))
      )
      .subscribe((country) => {
        if (!country) {
          return this.router.navigateByUrl('');
        }

        //console.log('tenemos un pais');
        return this.country = country;
      });
  }

}
