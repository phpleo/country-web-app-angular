import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) { 

  }

  public searchCapital(term: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/capital/${term}`;
    
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError((error) => {
          //console.log(error);
          return of([]);
        })
      );
  }

  public searchCountry(term: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/name/${term}`;

    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError((error) => {
          return of([]);
        })
      );
  }

  public searchRegion(region: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/region/${region}`;

    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError((error) => {
          return of([]);
        })
      );
  }

}
