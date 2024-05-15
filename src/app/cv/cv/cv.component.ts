import { Component, inject } from '@angular/core';
import { Cv } from '../model/cv';
import { LoggerService } from '../../services/logger.service';
import { ToastrService } from 'ngx-toastr';
import { CvService } from '../services/cv.service';
import { EMPTY, Observable, catchError, of, retry } from 'rxjs';
@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
})
export class CvComponent {
  cvs$: Observable<Cv[]> = this.cvService.getCvs().pipe(
    retry({
      delay: 2000,
      count: 4
    }),
    catchError((e) => {
      this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
      return of(this.cvService.getFakeCvs());
    }),

  );
  selectedCv: Cv | null = null;
  /*   selectedCv: Cv | null = null; */
  date = new Date();

  constructor(
    private logger: LoggerService,
    private toastr: ToastrService,
    private cvService: CvService
  ) {
    this.logger.logger('je suis le cvComponent');
    this.toastr.info('Bienvenu dans notre CvTech');
  }
  // onForwardCv(cv: Cv) {
  //   this.selectedCv = cv;
  // }
}
