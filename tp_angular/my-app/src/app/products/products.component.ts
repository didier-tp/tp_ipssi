import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Product } from '../product';
import { NgForm, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit  {
  
  nouveauProduit : Product = new Product();
  listeProduits  : Product[] = [];
  prixMaxi : number ; //undefined / default

  categorieProd : string ; //à afficher via {{categorieProd}}
        //éventuel critère de recherche sur appel WS en get
  
  constructor(private route : ActivatedRoute,
              private productsService : ProductsService) { 
   //NB: 'categorie' correspond au nom logique du paramètre variable
   //en fin du path '/products/:categorie' d'une des routes
   //this.categorieProd = this.route.snapshot.params['categorie'];
   this.route.params.subscribe(
    (params: Params) => {this.categorieProd = params['categorie'];
                         this.onRefreshCategorie() } );



  }

  onDeleteProd(p:Product){
    this.productsService.supprimerProduit(p._id)
    .subscribe(
      ()=>{ console.log("suppression ok"); this.onRefreshCategorie(); },
      (err)=>{console.log(err);}
    )
  }

  onRefreshPrixMaxi() { 
    this.productsService.rechercherProduits(this.categorieProd,this.prixMaxi)
                        .subscribe( (listeProd) => { this.listeProduits = listeProd },
                                    (err) => { console.log(err) });
  }

  onRefreshCategorie() {
    this.prixMaxi=null; 
    this.productsService.rechercherProduits(this.categorieProd,null)
                        .subscribe( (listeProd) => { this.listeProduits = listeProd },
                                    (err) => { console.log(err) });
  }
 

  public onAjoutProduit(){
    this.nouveauProduit.categorie=this.categorieProd;
    this.productsService.ajouterProduit(this.nouveauProduit)
        .subscribe( (produitEnregistre) => { 
                          console.log("produit enregistre=" + 
                               JSON.stringify(produitEnregistre));
                          this.onRefreshPrixMaxi();
                         },
                    (err) => { console.log(err) })
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
