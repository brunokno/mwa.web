import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidator } from '../../validators/custom.validator';
import { DataService } from '../../services/data.service';
import { Ui } from '../../utils/ui';
import { Router } from '@angular/router';
import { BaseFormComponent } from '../../components/shared/base-form/base-form.component';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  providers: [Ui, DataService]
})
export class RegisterPageComponent extends BaseFormComponent  implements OnInit {
  public errors: any[] = [];

  public chkIsento: boolean = false;
  private docType: boolean = true;
 
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
    this.form = this.fb.group({
      firstName: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required
      ])],
      lastName: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required
      ])],
      inscricaoEstadual: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required
      ])],
      companyName: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(40),
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required,
        CustomValidator.EmailValidator
      ])],
      document: ['', Validators.compose([
        Validators.minLength(15),
        Validators.maxLength(18),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])],
      confirmPassword: ['', 
      [CustomValidator.equalsTo('password')]
      ],
      phone: ['', Validators.compose([
        Validators.minLength(14),
        Validators.maxLength(15),
        Validators.required
      ])],
      cellphone: ['', Validators.compose([
        Validators.minLength(14),
        Validators.maxLength(15),
        Validators.required
      ])],
      cep: ['', [
          Validators.required
          //CustomValidator.cepValidator
        ]
      ],
      endereco: ['', 
        Validators.required
      ],
      numero: ['', 
        Validators.required
      ],
      complemento: [''],
      bairro: ['', 
        Validators.required
      ],
      cidade: ['', 
        Validators.required
      ],
      estado: ['', 
        Validators.required
      ],
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

  getCep(cep) {
    this.dataService
      .getCep(cep)
      .subscribe((response) => {
        this.form.controls.endereco.patchValue(response.logradouro);
        this.form.controls.complemento.patchValue(response.complemento);
        this.form.controls.bairro.patchValue(response.bairro);
        this.form.controls.cidade.patchValue(response.localidade);
        this.form.controls.estado.patchValue(response.uf);
      },
        error => {
          this.errors = [{error:{message:"Problemas ao consultar o CEP"}}];
        }
      );
  }

  InscricaoCheck() {
    this.chkIsento = !this.chkIsento;

    if (this.chkIsento)
      this.form.controls.inscricaoEstadual.patchValue('Isento');
    else
      this.form.controls.inscricaoEstadual.patchValue('');
  }

  TypePerson(){
    console.log(!this.docType);
    this.docType = !this.docType;
  }

  // private doc;
  // cpfcnpjmask (){
  //   var numbers = this.doc.match(/\d/g);
  //   var numberLength = 0;
  //   if (numbers) {
  //     numberLength = numbers.join('').length;
  //   }
  //   if (numberLength <= 11) {
  //     return [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
  //   } else {
  //     return [/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/,  /[0-9]/, '-', /[0-9]/, /[0-9]/];
  //   }
  // }

}