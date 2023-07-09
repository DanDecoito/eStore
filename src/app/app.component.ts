import { Component, OnInit } from '@angular/core';
import { CartServiceService } from './services/cart-service.service';

interface CartItem {
  title: string;
  image: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'eStore';
  isMenuOpen: boolean = false;
  isModalOpen: boolean = false;
  cartItem: CartItem[] = [];

  constructor(private cartService: CartServiceService){}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {

    this.cartItem = this.cartService.loadCartItems()
    // const cartItems = localStorage.getItem('cartItems');
    // this.cartItem = cartItems ? JSON.parse(cartItems) : [];

  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  checkout() {
    // Add your checkout logic here
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCartItem(item);
    }
  }
  
  increaseQuantity(item: CartItem) {
    item.quantity++;
    this.updateCartItem(item);
  }
  
  updateCartItem(item: any) {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      const storedCartItems: CartItem[] = JSON.parse(cartItems);
      const updatedCartItems = storedCartItems.map((storedItem) => {
        if (storedItem.title === item.title) {
          storedItem.quantity = item.quantity;
        }
        return storedItem;
      });
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
  }
  

  deleteItem(item: CartItem) {
    const index = this.cartItem.findIndex((cartItem) => cartItem.title === item.title);
    if (index !== -1) {
      this.cartItem.splice(index, 1);
      this.updateCartItem(this.cartItem);
    }
  }

  saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItem));
  }
}