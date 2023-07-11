import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  allProductsList: any[] = [];
  randomProducts: any[] = [];

  constructor(private productService: ProductService) {}

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
}
