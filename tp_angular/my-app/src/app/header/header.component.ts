import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

}
