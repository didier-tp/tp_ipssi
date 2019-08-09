import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable, of  } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //injection de http via constructeur:
  constructor(private http : HttpClient) { }
  
  private _headers = new HttpHeaders({'Content-Type': 'application/json'});

  ajouterProduit(p : Product) : Observable<Product> {
    let urlWs = "./catalogue/private/products";
    return this.http.post<Product>(urlWs,p,{headers: this._headers});
  }

  //NB: Observable de rxjs correspondra à :
      // - un objet technique immédiatement retourné par cette méthode
      // - qui permettra de récupéré le résultat en différé (asynchrone)
  rechercherProduits(categorie : string,prixMaxi : number) : Observable < Product[] > {
    //NB: URL absolue ok si autorisations "CORS" dans nodejs/express
    //let urlWs = "http://localhost:8282/catalogue/public/products";
    let urlWs = "./catalogue/public/products";
    if(categorie) 
        urlWs+="?categorie="+categorie;
    if(prixMaxi) 
        urlWs+="?prixMax="+prixMaxi;
    //NB: url relative ok si ng serve --proxy-config proxy.conf.json
    //ou équivalent en prod (et pas besoin de autorisation "CORS")
    return this.http.get<Product[]>(urlWs)
                    .pipe(
                       map((prods) => prods.sort( (p1,p2) => (p1.price - p2.price)))
                     );
   /*
    //code temporaire avant vrai appel du web service
    return of([
      new Product(1,"cahier du service",2.5,"grand cahier"),
      new Product(2,"stylo du service",4.5,"stylo bille")
    ]);*/
  }

  //+autres méthodes

 
}
