import { FormControl, FormGroup, FormArray } from "@angular/forms";

export class CustomValidator {
    static NegativeNumberValidator(control: FormControl) {
        var value: number = control.value.toString().replace(/[^0-9]/g, '');

        if (value < 0) {
            return {
                "Número inválido": true
            };
        }

        return null;
    }

    static ZipCodeValidator(control: FormControl) {
        var value: String = control.value.toString().replace(/[^0-9]/g, '').slice(0, 8);

        if (value.length != 8) {
            return {
                "CEP inválido": true
            };
        }

        return null;
    }

    static SelectValidator(control: FormControl) {
        var value: number = control.value.toString();

        if (value == 0) {
            return {
                "Selecione uma opção.": true
            };
        }

        return null;
    }

    static EmailValidator(control: FormControl) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(control.value)) {
            return { "E-mail inválido": true };
        }

        return null;
    }

    static requiredMinCheckbox(min = 1) {
        const validator = (formArray: FormArray) => {
            /* const values = formArray.controls;
            let totalChecked = 0;
            for (let i = 0; i < values.length; i++) {
              if (values[i].value) {
                totalChecked += 1;
              }
            } */
            const totalChecked = formArray.controls
                .map(v => v.value)
                .reduce((total, current) => current ? total + current : total, 0);
            return totalChecked >= min ? null : { required: true };
        };
        return validator;
    }

    static cepValidator(control: FormControl) {

        const cep = control.value;
        if (cep && cep !== '') {
            const validacep = /^[0-9]{8}$/;
            return validacep.test(cep) ? null : { cepInvalido: true };
        }
        return null;
    }

    static equalsTo(otherField: string) {
        const validator = (formControl: FormControl) => {
            if (otherField == null) {
                throw new Error('É necessário informar um campo.');
            }

            if (!formControl.root || !(<FormGroup>formControl.root).controls) {
                return null;
            }

            const field = (<FormGroup>formControl.root).get(otherField);

            if (!field) {
                throw new Error('É necessário informar um campo válido.');
            }

            if (field.value !== formControl.value) {
                return { equalsTo: otherField };
            }

            return null;
        };
        return validator;
    }

    static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
        const config = {
            'required': `${fieldName} é obrigatório.`,
            'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
            'maxlength': `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
            'cepInvalido': 'CEP inválido.',
            'emailInvalido': 'Email já cadastrado!',
            'equalsTo': 'Campos não são iguais',
            'pattern': 'Campo inválido'
        };

        return config[validatorName];
    }

    static CNPJValidator(cnpj) {
        cnpj = cnpj.replace(".", "").replace(".", "").replace("/", "").replace("-", "");

        var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
        digitos_iguais = 1;
        if (cnpj.length < 14 && cnpj.length < 15) {
            return false;
        }
        for (i = 0; i < cnpj.length - 1; i++)
            if (cnpj.charAt(i) != cnpj.charAt(i + 1)) {
                digitos_iguais = 0;
                break;
            }
        if (!digitos_iguais) {
            tamanho = cnpj.length - 2
            numeros = cnpj.substring(0, tamanho);
            digitos = cnpj.substring(tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0)) {
                return false;
            }
            tamanho = tamanho + 1;
            numeros = cnpj.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1)) {
                return false;
            }
            return true;
        }
        else {
            return false;
        }
    }

    static CPFValidator(cpf) {
        cpf = cpf.replace(".", "").replace(".", "").replace("-", "");

        if ((cpf == "00000000000") || (cpf == "11111111111") || (cpf == "22222222222") || (cpf == "33333333333") || (cpf == "44444444444") || (cpf == "55555555555") || (cpf == "66666666666") || (cpf == "77777777777") || (cpf == "88888888888") || (cpf == "99999999999")) {
            return false;
        }

        if (cpf.length > 11) {
            return false;
        }

        var i;
        var c = cpf.substr(0, 9);
        var dv = cpf.substr(9, 2);
        var d1 = 0;

        for (i = 0; i < 9; i++) {
            d1 += c.charAt(i) * (10 - i);
        }

        if (d1 == 0) {
            return false;
        }

        d1 = 11 - (d1 % 11);
        if (d1 > 9) d1 = 0;
        if (dv.charAt(0) != d1) {
            return false;
        }
        d1 *= 2;
        for (i = 0; i < 9; i++) {
            d1 += c.charAt(i) * (11 - i);
        }
        d1 = 11 - (d1 % 11);
        if (d1 > 9) d1 = 0;
        if (dv.charAt(1) != d1) {
            return false;
        }
        return true;
    }
}