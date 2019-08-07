import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //injection de http via constructeur:
  constructor(private http : HttpClient) { }

  //NB: Observable de rxjs permettra correspondra à :
      // - un objet technique immédiatement retourné par cette méthode
      // - qui permettra de récupéré le résultat en différé (asynchrone)
  rechercherProduits(prixMaxi : number) : Observable < Product[] > {
    //NB: URL absolue ok si autorisations "CORS" dans nodejs/express
    //let urlWs = "http://localhost:8282/catalogue/public/products";
    let urlWs = "./catalogue/public/products";
    //NB: url relative ok si ng serve --proxy-config proxy.conf.json
    //ou équivalent en prod (et pas besoin de autorisation "CORS")
    return this.http.get<Product[]>(urlWs);
   /*
    //code temporaire avant vrai appel du web service
    return of([
      new Product(1,"cahier du service",2.5,"grand cahier"),
      new Product(2,"stylo du service",4.5,"stylo bille")
    ]);*/
  }

  //+autres méthodes

 
}
