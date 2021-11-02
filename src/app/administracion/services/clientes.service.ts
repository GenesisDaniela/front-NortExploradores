import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as global from 'global';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  url = `${global.url}/pasajero/`;

  constructor(private http: HttpClient) { }

  public listarCliente():Observable<any>{    
    return this.http.get<any>(this.url);
  }
}
