import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://www.omdbapi.com/?apikey=a35f6d77';

  constructor(private http: HttpClient) { }

  searchMovies (params:string):Observable<any>{
    return this.http.get(`${this.apiUrl}&s=${params}`);
  }


}
