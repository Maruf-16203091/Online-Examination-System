import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
// import { ProfileEditComponent } from './profile-edit/profile-edit.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  // { path: 'take-quiz', component: TakeQuizComponent },
  // { path: 'results', component: ResultsComponent },
  // { path: 'profile', component: ProfileComponent },
  // { path: 'profile/edit', component: EditProfileComponent },
  // { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
