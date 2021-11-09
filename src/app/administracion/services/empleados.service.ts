import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from 'global'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  url = `${global.url}/empleado/`;

  constructor(private http: HttpClient) { }

  public listarEmpleado():Observable<any>{    
    return this.http.get<any>(this.url);
  }
  obtenerEmpleado(id:string): Observable<any>{
    return this.http.get(this.url+id)
  }

  public post(empleado:any):Observable<any>{
    return this.http.post<any>(this.url, empleado)
  }

  editarEmpleado(empleado:any):Observable<any>{
    return this.http.put(this.url,empleado)
  }
}
