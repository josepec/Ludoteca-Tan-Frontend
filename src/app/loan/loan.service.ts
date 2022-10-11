import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { HttpClient } from '@angular/common/http';

import { Loan } from './model/Loan';
import { LoanPage } from './model/LoanPage';
//import { LOAN_DATA } from './model/mock-loans';
//import { LOAN_DATA_LIST } from './model/mock-loans-list';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  
  private urlLoan='http://localhost:8080/loan';

  constructor(private http: HttpClient) { 

  }

  getLoans(pageable: Pageable, title?: String, idClient?: number, date?: String): Observable<LoanPage> {

      let params = '';

        if (title != null) {
            params += 'title='+title;
        }

        if (idClient != null) {
            if (params != '') params += "&";
            params += "idClient="+idClient;
        }

        if (date != null) {
          if (params != '') params += "&";
          params += "date="+date;
        }

        let url;

        if (params == '') url=this.urlLoan;
        else url=this.urlLoan + '?'+params;
      
      //return of(LOAN_DATA);
      return this.http.post<LoanPage>(url, {pageable:pageable});
  }

  saveLoan(loan: Loan): Observable<void> {
      return this.http.put<void>(this.urlLoan, loan);
  }

  deleteLoan(idLoan : number): Observable<void> {
      return this.http.delete<void>(this.urlLoan+'/'+idLoan);
  }    

  getAllLoans(): Observable<Loan[]> {
      return this.http.get<Loan[]>(this.urlLoan);
  }
}
