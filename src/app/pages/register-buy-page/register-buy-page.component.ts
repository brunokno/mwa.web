import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomerReseller } from './customerreseller';
import { CustomerBilling } from './customerBilling';
import { CustomerMicrosoft } from './customerMicrosoft';
import { CustomValidator } from '../../validators/custom.validator';
import { DataService } from '../../services/data.service';
import { Ui } from '../../utils/ui';


@Component({
  selector: 'app-register-buy-page',
  templateUrl: './register-buy-page.component.html',
  providers: [Ui, DataService]
})
export class RegisterBuyPageComponent implements OnInit {
  public form: FormGroup;
  public errors: any[] = [];

  public chkIsento_faturamento: boolean = false;
  public chkIsento_microsoft: boolean = false;
  private docType_faturamento: boolean = false;
  private docType_microsoft: boolean = true;

  private faturarPara: boolean=true;
  private contaMicrosoftPara: number;

  private customerReseller: CustomerReseller;
  private customerBilling: CustomerBilling;
  private customerMicrosoft: CustomerMicrosoft;

  constructor(
    private fb: FormBuilder,
    private ui: Ui,
    private dataService: DataService,
    private router: Router
  ) {
    this.form = this.fb.group({
      faturamento_firstName: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required
      ])],
      faturamento_lastName: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required
      ])],
      faturamento_inscricaoEstadual: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required
      ])],
      faturamento_companyName: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required
      ])],
      faturamento_email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required,
        CustomValidator.EmailValidator
      ])],
      faturamento_emailPortalAdmin: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required,
        CustomValidator.EmailValidator
      ])],
      faturamento_emailBoleto: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required,
        CustomValidator.EmailValidator
      ])],
      faturamento_document: ['', Validators.compose([
        Validators.minLength(11),
        Validators.maxLength(14),
        Validators.required
      ])],
      faturamento_username: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])],
      faturamento_password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])],
      faturamento_confirmPassword: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])],
      faturamento_phone: ['', Validators.compose([
        Validators.minLength(10),
        Validators.maxLength(11),
        Validators.required
      ])],
      faturamento_cellphone: ['', Validators.compose([
        Validators.minLength(10),
        Validators.maxLength(11),
        Validators.required
      ])],
      faturamento_cep: ['', Validators.compose([
        Validators.minLength(7),
        Validators.maxLength(8),
        Validators.required
      ])],
      faturamento_endereco: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(40),
        Validators.required
      ])],
      faturamento_numero: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(20),
        Validators.required
      ])],
      faturamento_complemento: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(20),
        Validators.required
      ])],
      faturamento_bairro: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(40),
        Validators.required
      ])],
      faturamento_cidade: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(40),
        Validators.required
      ])],
      faturamento_estado: ['', Validators.compose([
        Validators.minLength(26),
        Validators.maxLength(2),
        Validators.required
      ])],


      //Microsoft
      microsoft_firstName: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required
      ])],
      microsoft_lastName: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required
      ])],
      microsoft_inscricaoEstadual: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required
      ])],
      microsoft_companyName: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required
      ])],
      microsoft_email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required,
        CustomValidator.EmailValidator
      ])],
      microsoft_emailPortalAdmin: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required,
        CustomValidator.EmailValidator
      ])],
      microsoft_emailBoleto: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required,
        CustomValidator.EmailValidator
      ])],
      microsoft_document: ['', Validators.compose([
        Validators.minLength(11),
        Validators.maxLength(14),
        Validators.required
      ])],
      microsoft_username: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])],
      microsoft_password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])],
      microsoft_confirmPassword: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])],
      microsoft_phone: ['', Validators.compose([
        Validators.minLength(10),
        Validators.maxLength(11),
        Validators.required
      ])],
      microsoft_cellphone: ['', Validators.compose([
        Validators.minLength(10),
        Validators.maxLength(11),
        Validators.required
      ])],
      microsoft_cep: ['', Validators.compose([
        Validators.minLength(7),
        Validators.maxLength(8),
        Validators.required
      ])],
      microsoft_endereco: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(40),
        Validators.required
      ])],
      microsoft_numero: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(20),
        Validators.required
      ])],
      microsoft_complemento: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(20),
        Validators.required
      ])],
      microsoft_bairro: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(40),
        Validators.required
      ])],
      microsoft_cidade: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(40),
        Validators.required
      ])],
      microsoft_estado: ['', Validators.compose([
        Validators.minLength(26),
        Validators.maxLength(2),
        Validators.required
      ])]
    });
  }


  ngOnInit() {
    //this.form.controls.endereco.patchValue('teste');    
    this.getCustomerReseller();    
    this.customerBilling = {} as CustomerBilling;
    this.customerMicrosoft = {} as CustomerMicrosoft;  
  }

  submit() {
    this.dataService.createUser(this.form.value).subscribe(result => {
      alert('Bem vindo ao Modern Store');
      this.router.navigateByUrl('/');
    }, error => {
      this.errors = JSON.parse(error._body).errors;
    });
  }

  InscricaoCheck(type) {
    if (type == 'faturamento') {
      this.chkIsento_faturamento = !this.chkIsento_faturamento;

      if (this.chkIsento_faturamento)
        this.form.controls.faturamento_inscricaoEstadual.patchValue('Isento');
      else
        this.form.controls.faturamento_inscricaoEstadual.patchValue('');
    } else {
      this.chkIsento_microsoft = !this.chkIsento_microsoft;

      if (this.chkIsento_microsoft)
        this.form.controls.microsoft_inscricaoEstadual.patchValue('Isento');
      else
        this.form.controls.microsoft_inscricaoEstadual.patchValue('');
    }
  }

  FaturarPara(val){
    if(val =="0"){
      this.customerBilling = this.customerReseller;
      this.faturarPara= !this.faturarPara;
    }      
    else{
      this.customerBilling = {} as CustomerBilling;
      this.faturarPara= !this.faturarPara;
    }
  }

  MicrosoftPara(val){
    if(val =="0")
      this.customerMicrosoft = this.customerReseller;
    else if(val =="1")
      this.customerMicrosoft = {} as CustomerMicrosoft;
    else if(val == "2"){
      this.customerMicrosoft = this.customerBilling;
    }
  }

  TypePerson(type) {
    //console.log(!this.docType);
    if (type == 'faturamento')
      this.docType_faturamento = !this.docType_faturamento;
    else
      this.docType_microsoft = !this.docType_microsoft;
  }

  getCep(cep, type) {
    this.dataService
      .getCep(cep)
      .subscribe((response) => {
        this.fillDelivery(type, response);
      },
        error => {
          this.errors = [{ error: { message: "Problemas ao consultar o CEP" } }];
        }
      );
  }

  fillDelivery(type, response) {
    if (type == 'faturamento') {
      this.form.controls.faturamento_endereco.patchValue(response.logradouro);
      this.form.controls.faturamento_complemento.patchValue(response.complemento);
      this.form.controls.faturamento_bairro.patchValue(response.bairro);
      this.form.controls.faturamento_cidade.patchValue(response.localidade);
      this.form.controls.faturamento_estado.patchValue(response.uf);
    } else {
      this.form.controls.microsoft_endereco.patchValue(response.logradouro);
      this.form.controls.microsoft_complemento.patchValue(response.complemento);
      this.form.controls.microsoft_bairro.patchValue(response.bairro);
      this.form.controls.microsoft_cidade.patchValue(response.localidade);
      this.form.controls.microsoft_estado.patchValue(response.uf);
    }
  }

  getCustomerReseller() {
    this.customerReseller = this.dataService.getReseller();
  }

}
