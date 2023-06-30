import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  allProductsList: any[] = [];
  constructor(private productService: ProductService) { }
  
  ngOnInit(): void {
    this.loadAllProducts();
  }
  
  
  loadAllProducts()
  {
    this.productService.getAllProducts().subscribe((data: any[]) =>
    {
      this.allProductsList = data;
      console.log(this.allProductsList);
    });
  }

 






}
