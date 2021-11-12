import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as global from 'global'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PaquetesService {

  url = `${global.url}/paquete/`;

  constructor(private http: HttpClient) { }

  public listarPaquete():Observable<any>{    
    return this.http.get<any>(this.url);
  }
  
  public post(paquete:any):Observable<any>{
    return this.http.post<any>(this.url, paquete);
  }
  
  public postAct(actividades: any [], paquete:any):Observable<any>{
    return this.http.post<any>(this.url+paquete+'guardarActividades', actividades);
  }

  obtenerPaquete(id:string): Observable<any>{
    return this.http.get(this.url+id)
  }
  
  editarPaquete(id:string,paquete:any):Observable<any>{
      return this.http.put(this.url,paquete)
  }
}
