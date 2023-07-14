import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http  : HttpClient) { }

  getTableData(): Observable<any>{
    return this.http.get<any>('/assets/table.json');
  }
  getCardData():Observable<any>{
    return this.http.get<any>('/assets/card.json')  }
}
