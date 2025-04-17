import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, category);
  }

  updateCategory(categoryId: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/${categoryId}`, category);
  }

  deleteCategory(categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${categoryId}`);
  }
}
