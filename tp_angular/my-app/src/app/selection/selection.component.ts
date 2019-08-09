import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.sass']
})
export class SelectionComponent implements OnInit {

  element : string ;

  constructor(public commonService : CommonService) { }

  onAjoutSelection(){
    console.log("ajout element " + this.element);
    //this.commonService.compteur++;
    let cpt = this.commonService.bsCompteur.getValue();
    this.commonService.bsCompteur.next(cpt+1);
  }

  ngOnInit() {
  }

}
