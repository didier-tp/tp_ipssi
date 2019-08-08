import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {Router} from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  categorieProduit = "papeterie";

  constructor(private router: Router,
    public commonService : CommonService) { }

  onCategorieChange(){
    let link = ['/products', this.categorieProduit]; 
    this.router.navigate( link );
  }

  @Output()
  couleurEvent : EventEmitter<{value:string}> = new EventEmitter<{value:string}>();

  riseEvent(evt:any){
    //this.couleurEvent.emit({value: evt.target.value});
    this.couleurEvent.emit({value: this.couleurFond});
  }

  @Input()
  titre : string = "titre par defaut" ;

  listeCouleurs = [ "lightgrey" ,"red" , "green" , "blue"]
  couleurFond : string = "lightgrey";

  

  ngOnInit() {
  }

}
