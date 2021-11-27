import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from "global"
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CargosService {

  uri =`${global.url}/cargo/`;
  constructor(private http: HttpClient) { }
  
  public listarCargo():Observable<any>{
    return this.http.get<any>(this.uri)
  }

  public post(cargo:any):Observable<any>{
    return this.http.post<any>(this.uri, cargo)
  }

  obtenerCargo(id:string): Observable<any>{
  return this.http.get(this.uri+id)
  }

  editarCargo(id:string,cargo:any):Observable<any>{
    return this.http.put(this.uri,cargo)
  }

  deshabilitar(cargo:any):Observable<any>{
    return this.http.get(this.uri+cargo+'/deshabilitar')
  }
  
}
