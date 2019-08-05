import { Component, OnInit } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  numProdMax : number;
  nouveauProduit : Product = new Product();
  listeProduits  : Product[] = [];

  constructor() { 
   //code temporaire (avant appel Web service):
   this.listeProduits.push(new Product(1,"cahier",2.5,"grand cahier"));
   this.listeProduits.push(new Product(2,"gomme",1.5,"petite gomme"));
   this.listeProduits.push(new Product(3,"trousse",4.5,"trousse rouge"));
   this.numProdMax=3
  }

  public onAjoutProduit(){
    this.numProdMax++; //simuler auto incrementation
    this.nouveauProduit.num = this.numProdMax;
    this.listeProduits.push(this.nouveauProduit);
    this.nouveauProduit = new Product();
  }

  ngOnInit() {
  }

}
