import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Markup } from './markup';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-markup-page',
  templateUrl: './markup-page.component.html',
  providers:[DataService]
})
export class MarkupPageComponent implements OnInit {
 //private markups: Markup[]=[];
 private form: FormGroup;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder
  ) { 
    this.form = this.fb.group({      
      // Visible:[''],
      // CategoryName:[''],
      // PartNumber:[''],
      // Name:[''],
      // BasePriceBRL:[''],
      // MarkupPercentual:[''],
      // PriceSale:[''],
      // EffectivePrice:['']
      items: this.buildItems()
    })
  }

  // items = [
  //   {'Visible':false,'Name':'Angular','Description':'teste angular'},
  //   {'Visible':false,'Name':'React','Description':'teste react'} , 
  //   {'Visible':false,'Name':'Vue','Description':'teste vue'}, 
  //   {'Visible':false,'Name':'Sencha','Description':'teste sencha'}
  // ];
  //markupss =  this.dataService.getMarkups();
  markups =  this.dataService.getMarkups();

  buildItems(){
      const values = this.markups.map(v => {
        new FormControl(),new FormControl(),new FormControl()
        new FormControl(),new FormControl(),new FormControl()
        new FormControl(),new FormControl()
      });
      return this.fb.array(values);
  }

  ngOnInit() {
    //this.markups =  this.dataService.getMarkups();
    //this.markups.push(JSON.parse(this.dataService.getMarkups()));
  }

  apply(percentual,i){    
    var priceSale = (Number(this.markups[i].BasePriceBRL)  *(Number(1) + Number(percentual) ));
    var effectivePrice = (priceSale - this.markups[i].BasePriceBRL);
    // console.log(priceSale );
    // console.log(effectivePrice);

    //markup.PriceSale = priceSale;
    //markup.EffectivePrice = effectivePrice;

    this.markups[i].MarkupPercentual =Number(percentual);
    this.markups[i].PriceSale = priceSale;
    this.markups[i].EffectivePrice = effectivePrice;

  }

  submit(){
    console.log(this.form.value);
  }

}
