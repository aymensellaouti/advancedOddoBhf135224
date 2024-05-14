import { ResolveFn, Router } from '@angular/router';
import { Cv } from '../model/cv';
import { inject } from '@angular/core';
import { CvService } from '../services/cv.service';
import { EMPTY, catchError } from 'rxjs';
import { APP_ROUTES } from 'src/config/routes.config';

export const detailsResolver: ResolveFn<Cv> = (route, state) => {
  const cvService = inject(CvService);
  const router = inject(Router);
  return cvService.getCvById(route.params['id']).pipe(
    catchError(e => {
      router.navigate([APP_ROUTES.cv]);
      return EMPTY;
    })
  );
};
