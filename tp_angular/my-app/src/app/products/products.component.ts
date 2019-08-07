import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Product } from '../product';
import { NgForm, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit  {
  
  numProdMax : number;
  nouveauProduit : Product = new Product();
  listeProduits  : Product[] = [];
  prixMaxi : number ; //undefined / default
  
  constructor(private productsService : ProductsService) { 
   this.productsService.rechercherProduits(null)
                       .subscribe( (listeProd) => { this.listeProduits = listeProd },
                                   (err) => { console.log(err) });

   /*
    //code temporaire (avant appel Web service):
   this.listeProduits.push(new Product(1,"cahier",2.5,"grand cahier"));
   this.listeProduits.push(new Product(2,"gomme",1.5,"petite gomme"));
   this.listeProduits.push(new Product(3,"trousse",4.5,"trousse rouge"));
   this.numProdMax=3*/

  }

  onRefreshPrixMaxi() { 
    this.productsService.rechercherProduits(this.prixMaxi)
                        .subscribe( (listeProd) => { this.listeProduits = listeProd },
                                    (err) => { console.log(err) });
  }
 

  public onAjoutProduit(){
    this.numProdMax++; //simuler auto incrementation
    this.nouveauProduit.num = this.numProdMax;
    this.listeProduits.push(this.nouveauProduit);
    this.nouveauProduit = new Product();
  }

  ngOnInit() {
  }

  @ViewChild('formProduct') form : NgForm ; //pour accéder/manipuler <form #formXy="ngForm"

  onFormInit(){
    console.log("onFormInit() called")
    //NB: dans ngOnInit() : trop tôt , this.form.controls['...'] undefined
    // l'événement (mouseenter) peut convenir (entre autres solutions).
    this.form.controls['prix'].setValidators(
    [Validators.required ,
    Validators.min(0),
    Validators.max(150)]);
    this.form.controls['description'].setValidators(
    [Validators.minLength(6)]);
    }

}
