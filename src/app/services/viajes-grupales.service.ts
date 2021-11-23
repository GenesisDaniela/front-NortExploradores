import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as global from 'global'

@Injectable({
  providedIn: 'root'
})
export class ViajesGrupalesService {
  uri =`${global.url}/solicitudtour/`;
  constructor(private http: HttpClient) { }
  
  public post(id:any, solicitud:any):Observable<any>{
    return this.http.post<any>(this.uri+id, solicitud)
  }
}
