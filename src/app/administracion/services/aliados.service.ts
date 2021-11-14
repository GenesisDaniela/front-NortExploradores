import { Injectable } from '@angular/core';
import * as global from 'global'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AliadosService {

  url = `${global.url}/empresa/`;

  constructor(private http: HttpClient) { }

  public listarAliados():Observable<any>{    
    return this.http.get<any>(this.url);
  }

  deshabilitar(empresa:any):Observable<any>{
    return this.http.get(this.url+empresa+'/deshabilitar')
  }
}
