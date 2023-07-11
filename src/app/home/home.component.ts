import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartServiceService } from '../services/cart-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  allProductsList: any[] = [];
  randomProducts: any[] = [];

  constructor(private productService: ProductService, private cartService: CartServiceService) {}

  ngOnInit() {
    this.loadAllProducts();
  }

  loadAllProducts() {
    this.productService.getAllProducts().subscribe((data: any[]) => {
      this.allProductsList = data;
      this.randomProducts = this.getRandomProducts(this.allProductsList, 3);
    });
  }

  getRandomProducts(array: any[], count: number): any[] {
    const shuffledArray = array.sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, count);
  }

  addToCart(item: any, quantity: number) {
    this.cartService.addToCart(item, quantity);
    this.cartService.loadCartItems
    
  }
}
