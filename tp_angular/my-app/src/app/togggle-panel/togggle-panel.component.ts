import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-togggle-panel',
  templateUrl: './togggle-panel.component.html',
  styleUrls: ['./togggle-panel.component.sass']
})
export class ToggglePanelComponent implements OnInit {

  toggleP : boolean =false;
  
@Input()
title : string = 'default panel title';

  constructor() { }

  ngOnInit() {
  }

}
