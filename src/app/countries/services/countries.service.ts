import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, map, delay, tap } from 'rxjs';

import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital:   { term: '', countries: []},
    byCountries: { term: '', countries: []},
    byRegion:    { region: '', countries: []},
  }

  constructor(private http: HttpClient) {
    this.loadFromLS();
  }

  private saveToLS() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLS() {
    if(!localStorage.getItem('cacheStore')) return;

    this.cacheStore =JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRecuest(url:string): Observable<Country[]>{
    return this.http.get<Country[]>( url )
    .pipe(
      catchError(()=> of ([])),
    );
  }

  searchCountryByAlphaCode (code: string):Observable <Country | null>{
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
    .pipe(
      map (countries => countries.length > 0 ? countries[0] : null),
      catchError (()=> of (null)),
     //delay (2000),
    );
  }

  searchCapital(term:string):Observable <Country[]>{
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRecuest( url )
    .pipe(
      tap( countries => this.cacheStore.byCapital = {term, countries}),
      tap(()=> this.saveToLS())
    );
  }

   searchCountry(term: string ):Observable <Country[]>{
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRecuest( url )
    .pipe(
      tap( countries => this.cacheStore.byCountries = {term, countries}),
      tap(()=> this.saveToLS())
    );
  }

  searchRegion(region: Region):Observable <Country[]>{
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRecuest( url )
    .pipe(
      tap( countries => this.cacheStore.byRegion = {region, countries}),
      tap(()=> this.saveToLS())
    );
  }
}
