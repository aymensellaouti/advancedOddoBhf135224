import { Component, OnInit } from '@angular/core';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from '../../../config/routes.config';
import { AuthService } from '../../auth/services/auth.service';
import { EMPTY, Observable, catchError, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-details-cv',
  templateUrl: './details-cv.component.html',
  styleUrls: ['./details-cv.component.css'],
})
export class DetailsCvComponent implements OnInit {
  cv$: Observable<Cv> = this.activatedRoute.data
  .pipe(
    tap(() => console.log('subscribtion')),
    map((data) => data['cv']),
    catchError((e) => {
      this.router.navigate([APP_ROUTES.cv]);
      return EMPTY;
    })
  );
  // cv$ = this.activatedRoute.params.pipe(
  //   switchMap((params) => this.cvService.getCvById(+params['id']))
  // );
  constructor(
    private cvService: CvService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    // const id = this.activatedRoute.snapshot.params['id'];
    // .subscribe(
    //   (data) => (this.cv = data['cv'])
    //   // params => {
    //   //     this.cvService.getCvById(+params['id']).subscribe({
    //   //       next: (cv) => {
    //   //         this.cv = cv;
    //   //       },
    //   //       error: (e) => {
    //   //
    //   //       },
    //   //     });
    // );
    // this.cvService.selectByName
  }
  deleteCv(cv: Cv) {
    this.cvService.deleteCvById(cv.id).subscribe({
      next: () => {
        this.toastr.success(`${cv.name} supprimé avec succès`);
        this.router.navigate([APP_ROUTES.cv]);
      },
      error: () => {
        this.toastr.error(
          `Problème avec le serveur veuillez contacter l'admin`
        );
      },
    });
  }
}
