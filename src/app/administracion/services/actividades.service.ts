import { Injectable } from '@angular/core';
import * as global from 'global'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  url = `${global.url}/actividad/`;

  constructor(private http: HttpClient) { }

  public listarActividad():Observable<any>{    
    return this.http.get<any>(this.url);
  }
  public post(actividad:any):Observable<any>{
    return this.http.post<any>(this.url,actividad)
  }


}
