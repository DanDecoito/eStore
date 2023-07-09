import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  private cartItems: any[] = [];
  cartItemsChanged = new Subject<any[]>();

  constructor() {
    this.loadCartItems();
  }

  private loadCartItems() {
    const cartItemsFromStorage = localStorage.getItem('cartItems');
    if (cartItemsFromStorage) {
      try {
        const parsedItems = JSON.parse(cartItemsFromStorage);
        if (Array.isArray(parsedItems)) {
          this.cartItems = parsedItems;
        } else {
          console.error('Invalid cart items JSON');
          this.clearCartItems();
        }
      } catch (error) {
        console.error('Error parsing cart items JSON:', error);
        this.clearCartItems();
      }
    }
  }

  private saveCartItems() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  private clearCartItems() {
    this.cartItems = [];
    localStorage.removeItem('cartItems');
  }

  addToCart(item: any, quantity: number) {
    const cartItem = {
      title: item.title,
      price: item.price,
      description: item.description,
      rating: item.rating,
      quantity: quantity
    };

    const existingItem = this.cartItems.find((cart: any) => cart.title === item.title);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push(cartItem);
    }

    this.saveCartItems();
    console.log('Added to cart:', cartItem);
  }

  removeFromCart(item: any) {
    const itemIndex = this.cartItems.findIndex((cart: any) => cart.title === item.title);
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.saveCartItems();
      this.cartItemsChanged.next(this.cartItems);
    }
  }
}
