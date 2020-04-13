import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavigationComponent } from './core/navigation/navigation.component';
import { ListComponent } from './memes/list/list.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ListComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      isLogged: false
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      isLogged: false
    }
  },
  // {
  //   path: '**',
  //   component: NotFoundComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
