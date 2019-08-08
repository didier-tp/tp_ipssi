import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent implements OnInit {

  categorieProduit : string ="papeterie"; //valeur par defaut

  constructor() { }

  ngOnInit() {
  }

}
