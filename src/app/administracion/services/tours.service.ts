import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from "global";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  uri = `${global.url}/tour/`

  constructor(private http:HttpClient) { }

  public listarTour():any{
    return this.http.get<any>(this.uri);
  }

  public post(tour:any):Observable<any>{
    return this.http.post<any>(this.uri, tour)
  }
}
