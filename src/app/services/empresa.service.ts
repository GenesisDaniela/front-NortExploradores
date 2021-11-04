import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as global from 'global'

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  uri=`${global.url}/empresa/`;
  constructor(private http: HttpClient) { }

  public listarEmpresa():Observable<any>{
    return this.http.get<any>(this.uri);
  }

  public post(empresa:any):Observable<any>{
    return this.http.post<any>(this.uri, empresa)
  }

}
