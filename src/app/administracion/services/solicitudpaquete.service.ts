import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from 'global'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SolicitudpaqueteService {
  uri =`${global.url}/solicitudtour/`;

  constructor(
    private http: HttpClient
  ) { }

  public obtenerSolicitud(idSolicitud:any):Observable<any>{
    return this.http.get(this.uri+idSolicitud);
  }
  
  public aceptarSolicitud(id:any):Observable<any>{
    return this.http.get(this.uri+id+"/aceptar");
  }

}
