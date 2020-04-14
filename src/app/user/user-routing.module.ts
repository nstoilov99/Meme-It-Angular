import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { DetailComponent } from '../memes/detail/detail.component';

const routes: Routes = [
  {
    path: 'profile',
    children: [{
      path: '',
      pathMatch: 'full',
      canActivate: [AuthGuard],
      component: ProfileComponent,
    },
    {
      path: 'detail/:id',
      component: DetailComponent,
      canActivate: [AuthGuard],
      data: {
        shouldFetchMeme: true,
        isLogged: true
      }
    }
  ],
  }
  
];

export const UserRoutingModule = RouterModule.forChild(routes);
