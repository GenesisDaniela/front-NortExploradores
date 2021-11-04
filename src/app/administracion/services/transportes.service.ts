import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as global from 'global'

@Injectable({
  providedIn: 'root'
})
export class TransportesService {

  uri =`${global.url}/transporte/`;
  constructor(private http: HttpClient) { }

  public listarTransporte():Observable<any>{
    return this.http.get<any>(this.uri);
  }
  
  public post(transporte:any):Observable<any>{
    return this.http.post<any>(this.uri, transporte)
  }
}
