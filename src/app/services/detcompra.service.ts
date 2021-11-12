import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from 'global'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DetcompraService {
  url =`${global.url}/detcompra/`;

  constructor(private http: HttpClient) { }

  public post(detcompra:any):Observable<any>{
    return this.http.post<any>(this.url+"detallescompra",detcompra);
}

}
