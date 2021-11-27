import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from 'global'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  uri=`${global.url}/notificacion/`;

  constructor(private http: HttpClient) { }

  public getNotificaciones():Observable<any>{
    return this.http.get<any>(this.uri+"activas");
  }

  public get():Observable<any>{
    return this.http.get<any>(this.uri);
  }

  public desactivar(id:number):Observable<any>{
    return this.http.get<any>(this.uri+id+"/desactivar");
  }
}
