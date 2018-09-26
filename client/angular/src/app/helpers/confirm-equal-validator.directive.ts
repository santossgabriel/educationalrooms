import { Validator, NG_VALIDATORS, AbstractControl, ValidatorFn } from '@angular/forms'
import { Directive, Input } from '@angular/core'

export function notEqualValidator(controlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (control.parent) {
      const controlToCompare = control.parent.get(controlName)
      if (controlToCompare && controlToCompare.value !== control.value)
        return { 'notequal': true }
    }
    return null
  };
}

@Directive({
  selector: '[appConfirmEqualValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ConfirmEqualValidatorDirective,
    multi: true
  }]
})
export class ConfirmEqualValidatorDirective implements Validator {
  @Input() appConfirmEqualValidator: string

  validate(control: AbstractControl): { [key: string]: any; } {
    if (control)
      return notEqualValidator(this.appConfirmEqualValidator)(control)
    return null
  }
}