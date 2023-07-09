import { Component, OnInit, OnDestroy, ElementRef, NgZone } from '@angular/core';
import { ProductService } from '../services/product.service';
import { SearchInterface } from '../services/searchInterface';
import { NgModel } from '@angular/forms';
import {PageEvent} from '@angular/material/paginator'


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

  constructor(private productService: ProductService, private elementRef: ElementRef, private ngZone: NgZone) { }
  
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

  addToCart(item: any, quantity: number) {
    const cartItem = {
      title: item.title,
      price: item.price,
      description: item.description,
      rating: item.rating,
      quantity: quantity
    };
  
    // Get the existing cart items from local storage
    let cartItems: any[] = [];
    const cartItemsData = localStorage.getItem('cartItems');
    if (cartItemsData) {
      try {
        cartItems = JSON.parse(cartItemsData);
        if (!Array.isArray(cartItems)) {
          cartItems = [];
        }
      } catch (error) {
        console.error('Invalid cart items JSON:', error);
      }
    }
  
    const existingItem = cartItems.find((cart: any) => cart.title === item.title);
    if (existingItem) {
      // If the item already exists, update the quantity
      existingItem.quantity += quantity;
    } else {
      // If the item doesn't exist, add it to the cart items
      cartItems.push(cartItem);
    }
  
    // Save the updated cart items back to local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
    console.log('Added to cart:', cartItem);
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



}
