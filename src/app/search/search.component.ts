import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { SearchInterface } from '../services/searchInterface';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  allProductsList: any[] = [];
  searchResults: SearchInterface[] = [];
  CategoriesList: any[] = [];
  selectedCategory: string = '';

  constructor(private productService: ProductService) { }
  
  ngOnInit(): void {
    this.loadAllProducts();
    
    
  }
  
  
  loadAllProducts()
  {
    this.productService.getAllProducts().subscribe((data: any[]) =>
    {
      this.allProductsList = data;
    });
  }



  loadByCategory(category: string) {
    this.productService.getProductByCategory(category).subscribe((data: any[]) => {
      this.allProductsList = data;
      console.log(this.CategoriesList);
    });
  }
 


  onSearch() {
    if (this.selectedCategory == '') {
      this.loadAllProducts();
      }
    else {
      this.loadByCategory(this.selectedCategory);
    }
    
  }



}
