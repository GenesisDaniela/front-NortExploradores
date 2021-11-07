import { Injectable } from '@angular/core';
import * as global from 'global'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlojamientosService {

  url = `${global.url}/alojamiento/`;
  constructor(private http: HttpClient) { }

  public listarAlojamiento():Observable<any>{    
    return this.http.get<any>(this.url);
  }
  public post(alojamiento:any):Observable<any>{
    return this.http.post<any>(this.url, alojamiento)
  }

  obtenerAlojamiento(id:string): Observable<any>{
    return this.http.get<any>(this.url+id)
  }

  editarAlojamiento(id:string,alojamiento:any):Observable<any>{
    return this.http.put<any>(this.url,alojamiento)
  }

}
