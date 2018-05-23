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

export class AccountModel {
  name: string
  email: string
  password: string
  confirm: string
}