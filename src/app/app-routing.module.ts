import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth-guard';

const routes: Routes = [
  {path: 'form',component: FormComponent ,canActivate:[AuthGuard]},
  {path: '', component: LoginComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
