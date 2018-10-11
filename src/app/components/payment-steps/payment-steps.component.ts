import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'payment-steps',
  templateUrl: './payment-steps.component.html',
  styleUrls: ['./payment-steps.component.css']
})
export class PaymentStepsComponent implements OnInit {

  @Input() step=2;
  constructor() { }

  ngOnInit() {
  }

  ApplyCssCircle(stepPage:Number) {
    if(this.step ==stepPage){
      return 'active';
    }
    else if(this.step >=stepPage){
      return 'active';
    }
    else if(this.step >= 4){
      return 'active';
    }    
  }

  applyCssBar(stepPage:Number) {
    if(this.step ==stepPage){
      return 'active';
    }
    else if(this.step >=stepPage){
      return 'active';
    }
    else if(this.step >= stepPage){
      return 'active';
    }   
  }

}
