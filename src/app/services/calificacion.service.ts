import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as global from 'global'

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {
  uri=`${global.url}/calificacion/`;

  constructor(private http: HttpClient) { }

  public listar():Observable<any>{
    return this.http.get<any>(this.uri);
  }
 
}
