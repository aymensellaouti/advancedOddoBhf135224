import { Component, inject } from '@angular/core';
import { CvService } from '../services/cv.service';
import { Cv } from '../model/cv';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-master-details',
  templateUrl: './master-details.component.html',
  styleUrls: ['./master-details.component.css'],
})
export class MasterDetailsComponent {
  cvs: Cv[] = [];
  private cvService = inject(CvService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private acr = inject(ActivatedRoute);
  constructor() {
    this.cvService.getCvs().subscribe({
      next: (cvs) => {
        this.cvs = cvs;
      },
      error: () => {
        this.cvs = this.cvService.getFakeCvs();
        this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
      },
    });
  }
  detailsCvs(cv: Cv) {
    this.router.navigate([cv.id], {relativeTo: this.acr});
  }
}
