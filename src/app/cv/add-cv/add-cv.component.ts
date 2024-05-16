import { Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CvService } from '../services/cv.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from 'src/config/routes.config';
import { Cv } from '../model/cv';
import { distinctUntilChanged, filter, tap } from 'rxjs';
import { uniqueCinValidator } from '../validators/unique-cin.async-validator';

@Component({
  selector: 'app-add-cv',
  templateUrl: './add-cv.component.html',
  styleUrls: ['./add-cv.component.css'],
})
export class AddCvComponent implements OnDestroy {
  formBuilder = inject(FormBuilder);
  form: FormGroup = this.formBuilder.group({
    name: ['', { validators: [Validators.required] }],
    firstname: ['', { validators: [Validators.required] }],
    job: ['', { validators: [Validators.required] }],
    path: [''],
    age: [40, { validators: [Validators.required] }],
    cin: [
      '',
      {
        validators: [Validators.required],
        asyncValidators: [uniqueCinValidator(this.cvService)],
        updateOn: 'blur'
      },
    ],
  });

  constructor(
    private cvService: CvService,
    private router: Router,
    private toaster: ToastrService
  ) {
    this.age.valueChanges
      .pipe(tap((age) => (age < 18 ? this.path.disable() : this.path.enable())))
      .subscribe();
    // this.age.valueChanges.subscribe(
    //    age => age < 18 ? this.path.disable() : this.path.enable()
    // );
    // Si on a un formulaire enregistré, on va le récupérer
    const form = localStorage.getItem('addCvForm');
    if (form) {
      this.form.setValue(JSON.parse(form));
    }
    // Sauvgareder le form à chaque fois qu'il est valide
    // this.form.statusChanges
    //   .pipe(
    //     filter(() => this.form.valid),
    //     tap(() => {
    //       // console.log('valid');
    //       localStorage.setItem('addCvForm', JSON.stringify(this.form.value));
    //     })
    //   ).subscribe();
  }
  ngOnDestroy(): void {
    if (this.form.valid) {
      localStorage.setItem('addCvForm', JSON.stringify(this.form.value));
    }
  }

  addCv() {
    this.cvService.addCv(this.form.value).subscribe({
      next: () => {
        this.toaster.success(`Le cv a été ajouté avec succès`);
        // Pour vider le localStorage du formulaire enregistré
        localStorage.removeItem('addCvForm');
        this.form.reset();
        this.router.navigate([APP_ROUTES.cv]);
      },
      error: (erreur) => {
        console.log(erreur);
        this.toaster.error(
          `Problème avec le serveur veuillez contacter l'admin`
        );
      },
    });
  }

  get name() {
    return this.form.get('name')!;
  }
  get firstname() {
    return this.form.get('firstname')!;
  }
  get age() {
    return this.form.get('age')!;
  }
  get path() {
    return this.form.get('path')!;
  }
  get cin() {
    return this.form.get('cin')!;
  }
  get job() {
    return this.form.get('job')!;
  }
}
