import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as global from 'global'
@Injectable({
  providedIn: 'root'
})
export class MunicipioService {
  uri=`${global.url}/municipio/`;

  constructor(private http: HttpClient) {
    
  }
  public listarMunicipio():Observable<any>{
      return this.http.get<any>(this.uri);
  }
}
