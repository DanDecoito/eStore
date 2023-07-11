import { Component, OnInit } from '@angular/core';
import { CartServiceService } from './services/cart-service.service';
import { StripeService } from './services/stripe.service';

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
    this.calculateTotal();
  }

  loadCart() {
    const cartItems = localStorage.getItem('cartItems');
    this.cartItem = cartItems ? JSON.parse(cartItems) : [];
    console.log(this.cartItem);
  }

  openModal() {
    this.isModalOpen = true;
    this.calculateTotal();
  }

  closeModal() {
    this.isModalOpen = false;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }



  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCartItem();
      this.calculateTotal();
    }
  }
  
  increaseQuantity(item: CartItem) {
    item.quantity++;
    this.updateCartItem();
    this.calculateTotal();
  }
  
  deleteItem(item: CartItem) {
    const index = this.cartItem.findIndex((cartItem) => cartItem.title === item.title);
    if (index !== -1) {
      this.cartItem.splice(index, 1);
      this.updateCartItem();
    }
    this.calculateTotal();
  }
  
  updateCartItem() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItem));
  }

  saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItem));
  }

  calculateTotal() {
    const multipliedValues = this.cartItem.map(item => item.price * item.quantity);
    const total = multipliedValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    this.calculatedTotal = Number(total.toFixed(2));
  }



  checkout() {
    // Add your checkout logic here
    this.stripeService.loadStripe();
  }

}
