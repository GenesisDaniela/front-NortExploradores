import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as global from "global";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  uri = `${global.url}/ruta/`

  constructor(private http:HttpClient) { }

  public guardarTransporteRuta(idRuta:number, idTransporte:any){
    this.http.get<any>(`${global.url}/${idRuta}/${idTransporte}`)
  }

  public listarRuta():any{
    return this.http.get<any>(this.uri);
  }

  public post(tour:any):Observable<any>{
    return this.http.post<any>(this.uri, tour)
  }
  obtenerRuta(id:string): Observable<any>{
    return this.http.get(this.uri+id);
  }

  editarRuta(ruta:any):Observable<any>{
    return this.http.put(this.uri,ruta);
  }

}
