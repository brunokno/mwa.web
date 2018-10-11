import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomerReseller } from './customerreseller';
import { CustomerBilling } from './customerBilling';
import { CustomerMicrosoft } from './customerMicrosoft';
import { CustomValidator } from '../../validators/custom.validator';
import { DataService } from '../../services/data.service';
import { Ui } from '../../utils/ui';
import { BaseFormComponent } from '../../components/shared/base-form/base-form.component';


@Component({
  selector: 'app-register-buy-page',
  templateUrl: './register-buy-page.component.html',
  providers: [Ui, DataService]
})
export class RegisterBuyPageComponent extends BaseFormComponent implements OnInit {
  //public form: FormGroup;
  public errors: any[] = [];

  public chkIsento_faturamento: boolean = false;
  public chkIsento_microsoft: boolean = false;
  private docType_faturamento: boolean = true;
  private docType_microsoft: boolean = true;

  private faturarPara: boolean=true;
  private contaMicrosoftPara: number;

  private customerReseller: CustomerReseller;
  private customerBilling: CustomerBilling;
  private customerMicrosoft: CustomerMicrosoft;

  //Masks
  public phoneMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/ , /\d/ , /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public rgMask = [ /\d/ , /\d/ , /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/];
  public cpfMask = [ /\d/ , /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/ , /\d/, /\d/, '-', /\d/, /\d/,];
  public cnpjMask = [ /\d/ , /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/ , /\d/, /\d/, '/', /\d/, /\d/,/\d/, /\d/, '-', /\d/, /\d/,];
  public cepMask = [/\d/ , /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
    
  constructor(
    private fb: FormBuilder,
    private ui: Ui,
    private dataService: DataService,
    private router: Router
  ) {
    super();
  }


  ngOnInit() {
    //this.form.controls.endereco.patchValue('teste');    
    this.getCustomerReseller();    
    this.customerBilling = {} as CustomerBilling;
    this.customerMicrosoft = {} as CustomerMicrosoft;  

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
      faturamento_email: ['',Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required,
        CustomValidator.EmailValidator
      ])],
      faturamento_document: ['', Validators.compose([
        Validators.minLength(15),
        Validators.maxLength(18),
        Validators.required
      ])],
      faturamento_password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])],
      faturamento_confirmPassword: ['', 
        [CustomValidator.equalsTo('faturamento_password')]
      ],
      faturamento_phone: ['', Validators.compose([
        Validators.minLength(14),
        Validators.maxLength(15),
        Validators.required
      ])],
      faturamento_cellphone: ['', Validators.compose([
        Validators.minLength(14),
        Validators.maxLength(15),
        Validators.required
      ])],
      faturamento_cep: ['', [
          Validators.required 
          //,CustomValidator.cepValidator
        ]
      ],
      faturamento_endereco: ['', 
        Validators.required
      ],
      faturamento_numero: ['', 
        Validators.required
      ],
      faturamento_complemento: [''],
      faturamento_bairro: ['', 
        Validators.required
      ],
      faturamento_cidade: ['', 
        Validators.required
      ],
      faturamento_estado: ['', 
        Validators.required
      ],



      

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
      microsoft_email: ['',Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required,
        CustomValidator.EmailValidator
      ])],
      microsoft_document: ['', Validators.compose([
        Validators.minLength(15),
        Validators.maxLength(18),
        Validators.required
      ])],
      microsoft_password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])],
      microsoft_confirmPassword: ['', 
        [CustomValidator.equalsTo('microsoft_password')]
      ],
      microsoft_phone: ['', Validators.compose([
        Validators.minLength(14),
        Validators.maxLength(15),
        Validators.required
      ])],
      microsoft_cellphone: ['', Validators.compose([
        Validators.minLength(14),
        Validators.maxLength(15),
        Validators.required
      ])],
      microsoft_cep: ['', [
          Validators.required
          //,CustomValidator.cepValidator
        ]
      ],
      microsoft_endereco: ['', 
        Validators.required
      ],
      microsoft_numero: ['', 
        Validators.required
      ],
      microsoft_complemento: [''],
      microsoft_bairro: ['',
        Validators.required
      ],
      microsoft_cidade: ['',
        Validators.required
      ],
      microsoft_estado: ['', 
        Validators.required
      ]
    });
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
      this.faturarPara= false;
    }      
    else{
      this.customerBilling = {} as CustomerBilling;
      this.faturarPara= true;
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
    if (cep != null && cep !== '') {
      this.dataService
      .getCep(cep)
      .subscribe((response) => {
        this.fillDelivery(type, response);
      },
        error => {
          this.errors = [{ error: { message: "Problemas ao consultar o CEP" } }];
        });
    }
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

  validateEmail(email) {
    var re = /^(([^<>()\[\]\.,;:\s@@\"]+(\.[^<>()\[\]\.,;:\s@@\"]+)*)|(\".+\"))@@(([^<>()[\]\.,;:\s@@\"]+\.)+[^<>()[\]\.,;:\s@@\"]{2,})$/i;
    return re.test(email);
  }

}
