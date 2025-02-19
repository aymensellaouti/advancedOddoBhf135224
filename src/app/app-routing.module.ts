import { NgModule } from "@angular/core";
import { RouterModule, Route, PreloadAllModules } from "@angular/router";
import { MiniWordComponent } from "./directives/mini-word/mini-word.component";
import { ColorComponent } from "./components/color/color.component";
import { FrontComponent } from "./templates/front/front.component";
import { AdminComponent } from "./templates/admin/admin.component";
import { LoginComponent } from "./auth/login/login.component";
import { RhComponent } from "./optimizationPattern/rh/rh.component";
import { ProductsComponent } from "./products/products.component";
import { NF404Component } from "./components/nf404/nf404.component";
import { CustomPreloadingStrategy } from "./preloading strategies/custom.preloading-strategy";
// cv/list
const routes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'rh', component: RhComponent },
  {
    path: 'todo',
    loadChildren: () => import('./todo/todo.module').then(
      m => m.TodoModule
    )
  },
  {
    path: 'cv',
    data: {
      preload: true
    },
    loadChildren: () => import('./cv/cv.module').then(
      m => m.CvModule
    )
  },
  { path: 'products', component: ProductsComponent },

  {
    path: '',
    component: FrontComponent,
    children: [
      { path: 'word', component: MiniWordComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [{ path: 'color', component: ColorComponent }],
  },
  { path: '**', component: NF404Component },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreloadingStrategy
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
