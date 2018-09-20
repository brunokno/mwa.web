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
 fields: any;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder
  ) { 
    this.fields = {
      isRequired: true,
      type: {
        options: [
          {
            label: 'Option 1',
            value: '1'
          },
          {
            label: 'Option 2',
            value: '2'
          }
        ]
      }
    };

    this.form = this.fb.group({      
      // Visible:[''],
      // CategoryName:[''],
      // PartNumber:[''],
      // Name:[''],
      // BasePriceBRL:[''],
      // MarkupPercentual:[''],
      // PriceSale:[''],
      // EffectivePrice:['']
      teste: this.fb.group({
        items: this.fb.array([])
      })
      ,      
      //items: this.buildItems(),
      type: this.fb.group({
        options: this.fb.array([])   
      })
    });
    this.patch();
    this.patchItems();
  }

  // items = [
  //   {'Visible':false,'Name':'Angular','Description':'teste angular'},
  //   {'Visible':false,'Name':'React','Description':'teste react'} , 
  //   {'Visible':false,'Name':'Vue','Description':'teste vue'}, 
  //   {'Visible':false,'Name':'Sencha','Description':'teste sencha'}
  // ];
  //markupss =  this.dataService.getMarkups();
  //markups =  this.dataService.getMarkups();
  markups = {
    isRequired: true,
    teste: {
      items: [
        {
          Visible: "false",
          CategoryName: "Office 365",
          PartNumber: "OFFICESUBSCRIPTION",
          Name: "Office 365 Pro Plus",
          BasePriceBRL: "49.75",
          MarkupPercentual: "0.10",
          PriceSale: "49.75",
          EffectivePrice: "0.00"
      },
      {
          Visible: "false",
          CategoryName: "Serviços",
          PartNumber: "IMP-365",
          Name: "Implementação Office 365 com pagamento à vista",
          BasePriceBRL: "77.70",
          MarkupPercentual: "0.00",
          PriceSale: "77.70",
          EffectivePrice: "0.00"
      }
      ]
    }
  }
     

  patchItems() {
    const control = <FormArray>this.form.controls.teste;     
    this.markups.teste.items.forEach(x => {
      control.controls["items"] .push(
        this.patchValuesItems(          
            x.Visible, 
            x.CategoryName,
            x.PartNumber,
            x.Name,
            x.BasePriceBRL,
            x.MarkupPercentual,
            x.PriceSale, 
            x.EffectivePrice
            )
      )
    });
    console.log(control.controls["items"].controls);
    console.log(control.controls["items"].value);
  }
  
  patchValuesItems(Visible,CategoryName,PartNumber,Name,BasePriceBRL,MarkupPercentual,PriceSale,EffectivePrice) {
    return this.fb.group({
      Visible: [Visible],
      CategoryName: [CategoryName],
      PartNumber:[PartNumber],
      Name:[Name],
      BasePriceBRL:[BasePriceBRL],
      MarkupPercentual:[MarkupPercentual],
      PriceSale:[PriceSale],
      EffectivePrice:[EffectivePrice]
    })    
  }

  patch() {
    const control = <FormArray>this.form.controls.type;
    this.fields.type.options.forEach(x => {
      control.controls['options'].push(
        this.patchValues(
          x.label, 
          x.value
          )
        )
    })
  }
  
  patchValues(label, value) {
    return this.fb.group({
      label: [label],
      value: [value]
    })    
  }

  // buildItems(){
  //     const values = this.markups.map(v => {
  //       new FormControl({
  //         Visible:[]
          
  //       })
  //       ,
  //       new FormControl({CategoryName:[]}),
  //       new FormControl({PartNumber:[]})
  //       new FormControl({Name:[]}),
  //       new FormControl({BasePriceBRL:[]}),
  //       new FormControl({MarkupPercentual:[]})
  //       new FormControl({PriceSale:[]}),
  //       new FormControl({EffectivePrice:[]})
  //     });
  //     return this.fb.array(values);
  // }

  ngOnInit() {
    //this.markups =  this.dataService.getMarkups();
    //this.markups.push(JSON.parse(this.dataService.getMarkups()));


  }

  apply(percentual,i){    
    console.log(percentual);
    console.log(i);

    // var priceSale = (Number(this.markups[i].BasePriceBRL)  *(Number(1) + Number(percentual) ));
    // var effectivePrice = (priceSale - this.markups[i].BasePriceBRL);

    // this.markups[i].MarkupPercentual =Number(percentual);
    // this.markups[i].PriceSale = priceSale;
    // this.markups[i].EffectivePrice = effectivePrice;

    var priceSale = (Number(this.markups.teste.items[i].BasePriceBRL)  *(Number(1) + Number(percentual) ));
    var effectivePrice = (priceSale - Number(this.markups.teste.items[i].BasePriceBRL));

    this.markups.teste.items[i].MarkupPercentual =String(percentual);
    this.markups.teste.items[i].PriceSale = String(priceSale) ;
    this.markups.teste.items[i].EffectivePrice = String(effectivePrice) ;
  }

  submit(){
    console.log(this.form.value);
  }

}
