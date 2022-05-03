import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  configUrl = 'http://127.0.0.1:8080/ANNUAIRE/Serv?op=lister';
  

getConfig() {
  return this.http.get(this.configUrl, {responseType: 'text'});
}

}
