import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  private cartItems: any[] = [];
  cartItemsChanged = new Subject<any[]>();

  constructor() {
    // Retrieve cart items from local storage if available
    const cartItemsFromStorage = localStorage.getItem('cartItems');
    if (cartItemsFromStorage) {
      this.cartItems = JSON.parse(cartItemsFromStorage);
    }
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






  removeFromCart(item: any) {
    const itemIndex = this.cartItems.indexOf(item);
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      this.cartItemsChanged.next(this.cartItems);
    }
  }
  






}
