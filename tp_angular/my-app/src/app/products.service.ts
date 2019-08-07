import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //NB: Observable de rxjs permettra correspondra à :
      // - un objet technique immédiatement retourné par cette méthode
      // - qui permettra de récupéré le résultat en différé (asynchrone)
  rechercherProduits(prixMaxi : number) : Observable < Product[] > {
    //NB: la méthode prédéfinie of(tableau) permet de construire 
    //un observable à partir d'un simple tableau (pour test préliminaire)
    //code temporaire avant vrai appel du web service
    return of([
      new Product(1,"cahier du service",2.5,"grand cahier"),
      new Product(2,"stylo du service",4.5,"stylo bille")
    ]);
  }

  //+autres méthodes

  constructor() { }
}
