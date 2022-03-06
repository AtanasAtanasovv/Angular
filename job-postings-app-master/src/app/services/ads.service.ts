import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ad } from '../models/ad.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  private url = `${environment.apiURL}/ads`;

  constructor(private http: HttpClient) {
  }

  getAds$(): Observable<Ad[]> {
    return this.http.get<Ad[]>(this.url);
  }

  getAd$(id: number): Observable<Ad> {
    const url = `${this.url}/${id}`;

    return this.http.get<Ad>(url);
  }

  postAd$(ad: Ad): Observable<Ad> {
    return this.http.post<Ad>(this.url, ad);
  }

  putAd$(ad: Ad): Observable<Ad> {
    const url = `${this.url}/${ad.id}`;

    return this.http.put<Ad>(url, ad);
  }

  deleteAd$(id: number): Observable<void> {
    const url = `${this.url}/${id}`;

    return this.http.delete<void>(url);
  }
}
