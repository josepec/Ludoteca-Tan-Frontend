import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Category } from './model/Category';
//import { CATEGORY_DATA } from './model/mock-categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private urlCategory='http://localhost:8080/category';

  constructor(private http: HttpClient) { 
    
  }

  getCategories(): Observable<Category[]> {
    //return of(CATEGORY_DATA);
    return this.http.get<Category[]>(this.urlCategory);
  }

  saveCategory(category: Category): Observable<Category> {
    let url = this.urlCategory;
    if (category.id != null) url += '/'+category.id;

    return this.http.put<Category>(url, category);
  }

  deleteCategory(idCategory : number): Observable<any> {
    return this.http.delete(this.urlCategory+'/'+idCategory);
  } 

}
