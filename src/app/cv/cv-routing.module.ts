import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { authGuard } from "../auth/guards/auth.guard";
import { AddCvComponent } from "./add-cv/add-cv.component";
import { CvComponent } from "./cv/cv.component";
import { DetailsCvComponent } from "./details-cv/details-cv.component";
import { MasterDetailsComponent } from "./master-details/master-details.component";
import { detailsResolver } from "./resolvers/details.resolver";


export const CV_ROUTES = [
  {
    path: '',
    component: CvComponent,
  },
  {
    path: 'list',
    component: MasterDetailsComponent,
    children: [
      {
        path: ':id',
        component: DetailsCvComponent,
        resolve: {
          cv: detailsResolver,
        },
      },
    ],
  },
  { path: 'add', component: AddCvComponent, canActivate: [authGuard] },
  {
    path: ':id',
    component: DetailsCvComponent,
    resolve: {
      cv: detailsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(CV_ROUTES)],
  exports: [RouterModule]
})
export class CvRoutingModule {}
