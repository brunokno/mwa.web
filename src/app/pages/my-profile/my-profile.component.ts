import { Component, OnInit } from '@angular/core';
import { Ui } from '../../utils/ui';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  providers:[Ui]
})
export class MyProfileComponent implements OnInit {
  private user:any[] = [];

  constructor( private ui: Ui) { 
    this.user =  JSON.parse(localStorage.getItem("mws.user"));
  }

  ngOnInit() {
  }

  showModal() {
    this.ui.setActive('modal');
  }

  hideModal() {
    this.ui.setInactive('modal');
  }

}
