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

  public post(calificacion:any):Observable<any>{
    return this.http.post<any>(this.uri, calificacion)
  }

  obtenerCalificacion(id:string): Observable<any>{
    return this.http.get<any>(this.uri+id)
  }

  editarCalificacion(id:string,calificacion:any):Observable<any>{
    return this.http.put<any>(this.uri,calificacion)
  }
 
}
