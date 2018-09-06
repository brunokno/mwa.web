import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidator } from '../../validators/custom.validator';
import { DataService } from '../../services/data.service';
import { Ui } from '../../utils/ui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  providers: [Ui, DataService]
})
export class RegisterPageComponent implements OnInit {
  public form: FormGroup;
  public errors: any[] = [];

  public chkIsento: boolean = false;
  private docType: boolean = true;

  constructor(
    private fb: FormBuilder,
    private ui: Ui,
    private dataService: DataService,
    private router: Router
  ) {
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
      emailPortalAdmin: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required,
        CustomValidator.EmailValidator
      ])],
      emailBoleto: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required,
        CustomValidator.EmailValidator
      ])],
      document: ['', Validators.compose([
        Validators.minLength(11),
        Validators.maxLength(14),
        Validators.required
      ])],
      username: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])],
      confirmPassword: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])],
      phone: ['', Validators.compose([
        Validators.minLength(10),
        Validators.maxLength(11),
        Validators.required
      ])],
      cellphone: ['', Validators.compose([
        Validators.minLength(10),
        Validators.maxLength(11),
        Validators.required
      ])],
      cep: ['', Validators.compose([
        Validators.minLength(7),
        Validators.maxLength(8),
        Validators.required
      ])],
      endereco: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(40),
        Validators.required
      ])],
      numero: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(20),
        Validators.required
      ])],
      complemento: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(20),
        Validators.required
      ])],
      bairro: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(40),
        Validators.required
      ])],
      cidade: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(40),
        Validators.required
      ])],
      estado: ['', Validators.compose([
        Validators.minLength(26),
        Validators.maxLength(2),
        Validators.required
      ])],
    });
  }


  ngOnInit() {
    //this.form.controls.endereco.patchValue('teste');    
    this.chkIsento
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
}