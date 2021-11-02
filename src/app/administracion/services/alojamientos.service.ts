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
}
