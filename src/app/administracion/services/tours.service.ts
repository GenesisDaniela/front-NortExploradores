import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from "global";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  uri = `${global.url}/tour/`

  constructor(private http:HttpClient) { }

  public listarTour():any{
    return this.http.get<any>(this.uri);
  }

  public guardarTransporteTour(idTour:number, idTransporte:string){
    return this.http.post<any>(`${global.url}/tour/${idTour}/${idTransporte}`, null);
  }

  public editarTransporteTour(idTour:number, idTransporte:any):Observable<any>{
    return this.http.put<any>(`${global.url}/tour/${idTour}/${idTransporte}`,idTransporte);
  }

  public post(tour:any):Observable<any>{
    return this.http.post<any>(this.uri, tour)
  }

  obtenerTour(id:string): Observable<any>{
    return this.http.get(this.uri+id);
  }

  obtenerTrans(id:any): Observable<any>{
    return this.http.get(this.uri+id+'/transporte');
  }


  editarTour(tour:any):Observable<any>{
    return this.http.put<any>(this.uri,tour);
  }

  public tourDelMes():Observable<any>{
    const mes = "tourDelMes"
    return this.http.get<any>(`${this.uri}${mes}`);
  }
  deshabilitar(tour:any):Observable<any>{
    return this.http.get(this.uri+tour+'/deshabilitar')
  }
}
