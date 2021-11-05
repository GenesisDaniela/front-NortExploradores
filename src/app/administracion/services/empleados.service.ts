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
  public post(empleado:any):Observable<any>{
    return this.http.post<any>(this.url, empleado)
  }
}
