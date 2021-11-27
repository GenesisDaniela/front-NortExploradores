import { Injectable } from '@angular/core';

import * as global from 'global'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SugerenciasService {

  uri = `${global.url}/sugerencia/`;

  constructor(private http:HttpClient) { }

  public enviarDatos(recomendacion:any):Observable<any>{
    return this.http.post<any>(this.uri,recomendacion)
  }
  
}
