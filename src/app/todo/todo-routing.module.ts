import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { canLeaveGuard } from "../guard/can-leave.guard";
import { TodoComponent } from "./todo/todo.component";


const TODO_ROUTES: Routes = [
  { path: '', component: TodoComponent, canDeactivate: [canLeaveGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(TODO_ROUTES)],
  exports: [RouterModule]
})
export class TodoRoutingModule {}
