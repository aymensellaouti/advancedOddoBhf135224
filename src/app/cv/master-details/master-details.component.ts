import { Component, OnDestroy, inject } from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { CvService } from '../services/cv.service';
import { Cv } from '../model/cv';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-master-details',
  templateUrl: './master-details.component.html',
  styleUrls: ['./master-details.component.css'],
})
export class MasterDetailsComponent implements OnDestroy {
  cvs: Cv[] = [];
  subscriptions = new Subscription();
  private cvService = inject(CvService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private acr = inject(ActivatedRoute);
  constructor() {
    this.cvService.getCvs()
    .pipe(takeUntilDestroyed())
    .subscribe({
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
    //  si on utilise takeUntilDestroyed subscriptions.add
    // n'est plus nécessaire
    this.subscriptions.add(this.cvService.selectedCv$.subscribe(
      (cv) => this.router.navigate([cv.id], {relativeTo: this.acr})
    ));
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
