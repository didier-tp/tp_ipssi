import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  listeCouleurs = [ "lightgrey" ,"red" , "green" , "blue"]
  couleurFond : string = "lightgrey";

  constructor() { }

  ngOnInit() {
  }

}
