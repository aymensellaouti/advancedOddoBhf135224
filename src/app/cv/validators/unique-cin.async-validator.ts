import {  AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { map, of } from "rxjs";
import { CvService } from "../services/cv.service";

export function uniqueCinValidator(cvService: CvService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return cvService.selectByProperty('cin', control.value).pipe(
      map( cvs => cvs.length ? { 'cin': `Le cin ${control.value} existe déjà` } : null)
    );
  }
}
