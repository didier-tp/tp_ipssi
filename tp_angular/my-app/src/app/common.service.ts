import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  /*public*/ private compteur : number = 0;
  public bsCompteur : BehaviorSubject<number>
     = new BehaviorSubject<number>(this.compteur);

  constructor() { }
}
