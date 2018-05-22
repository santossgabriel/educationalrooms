import { FormControl, Validators, ValidationErrors, Validator, AbstractControl, NG_VALIDATORS, ValidatorFn } from "@angular/forms";
import { Input, Directive } from "@angular/core";
import { notEqualValidator } from "../helpers/confirm-equal-validator.directive";

export class LoginModel {
  email: FormControl
  password: FormControl
  constructor() {
    this.email = new FormControl('', [Validators.required])
    this.password = new FormControl('', [Validators.required])
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Informe o email.' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Informe a senha' : ''
  }
}

export class CreateAccountModel {
  name: FormControl
  email: FormControl
  password: FormControl
  confirm: FormControl

  constructor() {
    this.name = new FormControl('', [Validators.required, Validators.minLength(4)])
    this.email = new FormControl('', [Validators.required, Validators.minLength(8), Validators.email])
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)])
    this.confirm = new FormControl('', [Validators.required])
  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'Informe o nome de usuário.' :
      this.name.hasError('minlength') ? 'O nome deve ter pelo menos 4 caracteres.' :
        ''
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Informe o email.' :
      this.email.hasError('minlength') || this.email.hasError('email')
        ? 'Informe um email válido.' :
        ''
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Informe a senha' :
      this.password.hasError('minlength') ? 'O senha deve ter pelo menos de 6 caracteres.' :
        ''
  }
}