import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ByCapitalPageComponent } from './ui-pages/by-capital-page/by-capital-page.component';
import { ByCountryPageComponent } from './ui-pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './ui-pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './ui-pages/country-page/country-page.component';

import { CountriesRoutingModule } from './countries-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CountryTableComponent } from './ui-components/country-table/country-table.component';


@NgModule({
  declarations: [
    ByCapitalPageComponent,
    ByCountryPageComponent,
    ByRegionPageComponent,
    CountryPageComponent,
    CountryTableComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    SharedModule
  ]
})
export class CountriesModule { }
