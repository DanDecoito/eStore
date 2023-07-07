import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get('https://fakestoreapi.com/products');
  }

  getProductByCategory(category: string): Observable<any> {
    return this.http.get('https://fakestoreapi.com/products/category/' + category);
  }
}