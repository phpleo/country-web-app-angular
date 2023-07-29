import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';

import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  //
  // Private properties
  //

  private apiUrl: string = 'https://restcountries.com/v3.1';

  //
  // Public properties
  //

  public cacheMemoryStorage: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] }
  }

  //
  // Lifecile
  //

  constructor(private httpClient: HttpClient) { 
    //console.log('🐕‍🦺 CountriesService');
    this.loadFromLocalStorage();
  }

  //
  // Utils
  //

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError((error) => {
          //console.log(error);
          return of([]);
        }),
        //delay(2000)
      );
  }

  //
  // Search methods
  //

  public searchByAlphaCode(code: string): Observable<Country | null> {
    const url: string = `${this.apiUrl}/alpha/${code}`;
    
    return this.httpClient.get<Country[]>(url)
      .pipe(
        map((countries) => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }

  public searchCapital(term: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/capital/${term}`;
    
    return this.getCountriesRequest(url)
      .pipe(
        tap({
          next: (countries) => {
            this.cacheMemoryStorage.byCapital = {
              term: term,
              countries: countries
            }
          },
          error: (error) => {
            console.log('search by capital error:', error);
          }
        }),
        tap(() => this.saveToLocalStorage())
      );
  }

  public searchCountry(term: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/name/${term}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap({
          next: (countries) => {
            this.cacheMemoryStorage.byCountries = {
              term: term,
              countries: countries
            }
          },
          error: (error) => {
            console.log('search by capital error:', error);
          }
        }),
        tap(() => this.saveToLocalStorage())
      );

    // return this.httpClient.get<Country[]>(url)
    //   .pipe(
    //     catchError((error) => {
    //       return of([]);
    //     })
    //   );
  }

  public searchRegion(region: Region): Observable<Country[]> {
    const url: string = `${this.apiUrl}/region/${region}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap({
          next: (countries) => {
            this.cacheMemoryStorage.byRegion = {
              region: region,
              countries: countries
            }
          },
          error: (error) => {
            console.log('search by capital error:', error);
          }
        }),
        tap(() => this.saveToLocalStorage())
      );

    // return this.httpClient.get<Country[]>(url)
    //   .pipe(
    //     catchError((error) => {
    //       return of([]);
    //     })
    //   );
  }

  //
  // Web browser Local Storage
  //

  private saveToLocalStorage( ): void {
    localStorage.setItem('cacheStorage', JSON.stringify(this.cacheMemoryStorage));
  }

  private loadFromLocalStorage(): void {
    if (!localStorage.getItem('cacheStorage')) return;

    this.cacheMemoryStorage = JSON.parse(localStorage.getItem('cacheStorage')!);
  }

}
