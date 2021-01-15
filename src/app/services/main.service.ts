import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  generateSlug(url: string): Observable<string> {
    return this.http.post(`${this.apiUrl}/slug/new/`, url).pipe(
      tap((res: any) => {
        if (res.success) {
          console.log("Slug added successfully");

        }
      })
    )
  }

  fetchUrl(slug: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/${slug}`).pipe(
      tap((res: any) => {
      })
    )
  }

  getAllSlugs(): Observable<string[]> {
    return this.http.get(`${this.apiUrl}/all`).pipe(
      tap((res: any) => {

      })
    )
  }
}
