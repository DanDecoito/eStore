import { Component, OnInit } from '@angular/core';

interface CartItem {
  title: string;
  image: string;
  quantity: number;
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

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    const cartItems = localStorage.getItem('cartItems');
    this.cartItem = cartItems ? JSON.parse(cartItems) : [];
    console.log(this.cartItem);
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
  
  updateCartItem(item: CartItem) {
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
    const index = this.cartItem.indexOf(item);
    if (index > -1) {
      this.cartItem.splice(index, 1);
    }
    this.saveCart();
  }

  saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItem));
  }
}
