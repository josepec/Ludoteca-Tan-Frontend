import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Client } from './model/Client';
//import { CLIENT_DATA } from './model/mock-clients';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private urlClient='http://localhost:8080/client';

  constructor(private http: HttpClient) { 
    
  }

  getClients(): Observable<Client[]> {
    //return of(CLIENT_DATA);
    return this.http.get<Client[]>(this.urlClient);
  }

  saveClient(client: Client): Observable<Client> {
    let url = this.urlClient;
    if (client.id != null) url += '/'+client.id;

    return this.http.put<Client>(url, client);
  }

  deleteClient(idClient : number): Observable<any> {
    return this.http.delete(this.urlClient+'/'+idClient);
  } 

}
