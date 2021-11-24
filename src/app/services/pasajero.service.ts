import { Injectable } from '@angular/core';
import * as global from 'global'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasajeroService {
  uri = `${global.url}/pasajero`;

  constructor(private http: HttpClient) { }
  public getPasajero(idPasajero:number):Observable<any>{
    return this.http.get<any>(this.uri+"/"+idPasajero);
  }

  public post(pasajero:any, idUsuario:any):Observable<any>{
    return this.http.post<any>(this.uri+"/"+idUsuario,pasajero);
  }
}
