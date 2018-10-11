import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Markup } from './markup';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-markup-page',
  templateUrl: './markup-page.component.html',
  providers:[DataService]
})
export class MarkupPageComponent implements OnInit {
 public errors: any[] = [];
 private form: FormGroup;
 fields: any;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private router: Router
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
      teste: this.fb.group({
        items: this.fb.array([])
      })      
      // //,items: this.buildItems(),
      // type: this.fb.group({
      //   options: this.fb.array([])   
      // })
    });
    //this.patch();
    //this.patchItems();
  }

  markups = this.addMarkups()

  addMarkups(){
    let mk = {
      isRequired: true,
      teste:{
        items: 
         [
          
        //   {
        //       Visible: "false",
        //       CategoryName: "Office 365",
        //       PartNumber: "OFFICESUBSCRIPTION",
        //       Name: "Office 365 Pro Plus",
        //       BasePriceBRL: "49.75",
        //       MarkupPercentual: "0.10",
        //       PriceSale: "49.75",
        //       EffectivePrice: "0.00"
        //   },
        //   {
        //       Visible: "false",
        //       CategoryName: "Serviços",
        //       PartNumber: "IMP-365",
        //       Name: "Implementação Office 365 com pagamento à vista",
        //       BasePriceBRL: "77.70",
        //       MarkupPercentual: "0.00",
        //       PriceSale: "77.70",
        //       EffectivePrice: "0.00"
        //   }
         ]
      }
    }
    
    this.dataService
    .getMarkups()     
    .subscribe((response) => {
        response.data.items.forEach(x=>{
          mk.teste.items.push(x);
        })
        this.markups = mk;

        this.patchItems();  
      },
      error => {
        this.errors = [{error:{message:"Problemas ao consultar o Markup"}}];
      }
    );
    return mk;
  }

  patchItems() { 
    const control = <FormArray>this.form.controls.teste;     
    this.markups.teste.items.forEach(x => {
      control.controls["items"] .push(
        this.patchValuesItems(          
            x.visible, 
            x.categoryName,
            x.partNumber,
            x.name,
            x.basePriceBRL,
            x.markupPercentual,
            x.priceSale, 
            x.effectivePrice
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

  ngOnInit() {
    //this.markups =  this.dataService.getMarkups();
    //this.markups.push(JSON.parse(this.dataService.getMarkups()));
   
  }

  apply(percentual,i){    
    console.log(percentual);
    console.log(i);

    var priceSale = (Number(this.markups.teste.items[i].basePriceBRL)  *(Number(1) + Number(percentual) ));
    var effectivePrice = (priceSale - Number(this.markups.teste.items[i].basePriceBRL));
    // var priceSale = (Number(this.form.value.teste.items[i].BasePriceBRL)  *(Number(1) + Number(percentual) ));
    // var effectivePrice = (priceSale - Number(this.form.value.teste.items[i].BasePriceBRL));

    this.markups.teste.items[i].markupPercentual =String(percentual);
    this.markups.teste.items[i].priceSale = String(priceSale) ;
    this.markups.teste.items[i].effectivePrice = String(effectivePrice) ;  
    // this.form.value.teste.items[i].MarkupPercentual =String(percentual);
    // this.form.value.teste.items[i].PriceSale = String(priceSale) ;
    // this.form.value.teste.items[i].EffectivePrice = String(effectivePrice) ;
  
  }

  submit(){
    console.log("OBJETO:  " + this.markups.teste.items);
    console.log("FORM: " + this.form.value);
  
    //Ajuste temporário para atualizar form com o que foi alterado:
    for (let i = 0; i < this.markups.teste.items.length; i++) {
      this.form.value.teste.items[i].PriceSale = this.markups.teste.items[i].priceSale;
      this.form.value.teste.items[i].EffectivePrice = this.markups.teste.items[i].effectivePrice;      
    }

    this.dataService
      .createMarkup(this.form.value.teste)
      .subscribe(result => {
          alert('Markup criado com sucesso');
          this.router.navigateByUrl('/');
        }, error => {
          this.errors = JSON.parse(error._body).errors;
      });
  }

}
