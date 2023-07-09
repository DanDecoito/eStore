import { Component, OnInit, OnDestroy, ElementRef, NgZone } from '@angular/core';
import { ProductService } from '../services/product.service';
import { SearchInterface } from '../services/searchInterface';
import { NgModel } from '@angular/forms';
import {PageEvent} from '@angular/material/paginator'
import { CartServiceService } from '../services/cart-service.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  allProductsList: any[] = [];
  searchResults: SearchInterface[] = [];
  CategoriesList: any[] = [];
  selectedCategory: string = '';
  selectedItem: any = null;
  paginatedProductsList: any[] = [];
  quantity: number = 1;
  private clickOutsideTimeout: any;

  constructor(private productService: ProductService, private elementRef: ElementRef, private ngZone: NgZone, private cartService: CartServiceService) { }
  
  ngOnInit(): void {
    this.loadAllProducts();
  }



  loadAllProducts() {
    this.productService.getAllProducts().subscribe((data: any[]) => {
      this.allProductsList = data;
      this.handlePageEvent({ pageIndex: 0, pageSize: 10, length: this.allProductsList.length })
    });
  }

  loadByCategory(category: string) {
    this.productService.getProductByCategory(category).subscribe((data: any[]) => {
      this.allProductsList = data;
      this.handlePageEvent({ pageIndex: 0, pageSize: 10, length:this.allProductsList.length })
    });
  }

  onSearch() {
    if (this.selectedCategory === '') {
      this.loadAllProducts();
    } else {
      this.loadByCategory(this.selectedCategory);
    }
  }

  openModal(item: any) {
    this.selectedItem = item;
    this.quantity = 1;
  }

  closeModal() {
    this.ngZone.run(() => {
      this.selectedItem = null;
    });
  }

  
  
  handlePageEvent(pageEvent: PageEvent){
    const pageIndex = pageEvent.pageIndex;
    const pageSize = pageEvent.pageSize;
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;

    this.paginatedProductsList = this.allProductsList.slice(startIndex, endIndex);
  }


  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  
  // Function to increase the quantity
  increaseQuantity() {
    this.quantity++;
  }



  addToCart(item: any, quantity: number) {
    this.cartService.addToCart(item, quantity);
  }
  



}
