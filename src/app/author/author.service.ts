import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { HttpClient } from '@angular/common/http';

import { Author } from './model/Author';
import { AuthorPage } from './model/AuthorPage';
//import { AUTHOR_DATA } from './model/mock-authors';
//import { AUTHOR_DATA_LIST } from './model/mock-authors-list';

@Injectable({
    providedIn: 'root'
})
export class AuthorService {

    private urlAuthor='http://localhost:8080/author';

    constructor(private http: HttpClient) { 

    }

    getAuthors(pageable: Pageable): Observable<AuthorPage> {
        //return of(AUTHOR_DATA);
        return this.http.post<AuthorPage>(this.urlAuthor, {pageable:pageable});
    }

    saveAuthor(author: Author): Observable<void> {
        let url = this.urlAuthor;
        if (author.id != null) url+= '/'+author.id;

        return this.http.put<void>(url, author);
    }

    deleteAuthor(idAuthor : number): Observable<void> {
        return this.http.delete<void>(this.urlAuthor+'/'+idAuthor);
    }    

    getAllAuthors(): Observable<Author[]> {
        return this.http.get<Author[]>(this.urlAuthor);
    }

}