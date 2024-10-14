import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';
import { AdminGuard } from './auth/admin-guard.service';

// Import components
import { AllQuizComponent } from './all-quiz/all-quiz.component';
import { ProfileComponent } from './profile/profile.component';
import { ResultComponent } from './results/result/result.component';
import { TrainingComponent } from './training/training.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StartQuizComponent } from './quizzes/start-quiz/start-quiz.component';
import { QuizDetailComponent } from './quizzes/quiz-detail/quiz-detail.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { ViewDetailAnswerComponent } from './view-detail-answer/view-detail-answer.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CategoryListComponent } from './admin/category/category-list/category-list.component';
import { CategoryAddComponent } from './admin/category/category-add/category-add.component';
import { AdminQuizListComponent } from './admin/quiz/quiz-list/quiz-list.component';
import { AdminQuizAddComponent } from './admin/quiz/quiz-add/quiz-add.component';
import { UserListComponent } from './admin/user/user-list/user-list.component';
import { ResultListComponent } from './admin/result/result-list/result-list.component';
import { SettingsComponent } from './admin/settings/settings.component';

// Define routes
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },  // Protected Dashboard Route
  { path: 'start-quiz/:id', component: StartQuizComponent, canActivate: [AuthGuard] },  // Protected Start Quiz Route
  { path: 'quiz-detail/:id', component: QuizDetailComponent, canActivate: [AuthGuard] },  // Protected Quiz Detail Route
  { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] },  // Protected Training Route
  { path: 'result', component: ResultComponent, canActivate: [AuthGuard] },  // Protected Result Route
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }, // Protected Profile Route
  { path: 'update-profile', component: UpdateProfileComponent, canActivate: [AuthGuard] }, // Protected Update Profile Route
  { path: 'all-quiz/:category', component: AllQuizComponent, canActivate: [AuthGuard] },  // Protected All Quiz Route
  { path: 'view-detail-answer', component: ViewDetailAnswerComponent, canActivate: [AuthGuard] },  // Protected View Detail Answer Route

  // Public Routes
  { path: 'about-us', component: AboutUsComponent }, // Public About Us Route
  { path: 'contact-us', component: ContactUsComponent }, // Public Contact Us Route
  { path: 'privacy-policy', component: PrivacyPolicyComponent }, // Public Privacy Policy Route
  { path: 'terms-of-service', component: TermsOfServiceComponent }, // Public Terms of Service Route
  { path: 'login', component: LoginComponent }, // Public Login Route
  { path: 'register', component: RegisterComponent }, // Public Register Route
  { path: 'home', component: HomeComponent }, // Public Home Route

  // Admin Routes (Protected with AdminGuard)
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: 'admin/category-list', component: CategoryListComponent, canActivate: [AdminGuard] },
  { path: 'admin/category-add', component: CategoryAddComponent, canActivate: [AdminGuard] },
  { path: 'admin/quiz-list', component: AdminQuizListComponent, canActivate: [AdminGuard] },
  { path: 'admin/quiz-add', component: AdminQuizAddComponent, canActivate: [AdminGuard] },
  { path: 'admin/users', component: UserListComponent, canActivate: [AdminGuard] },
  { path: 'admin/result', component: ResultListComponent, canActivate: [AdminGuard] },
  { path: 'admin/settings', component: SettingsComponent, canActivate: [AdminGuard] },

  // Default and wildcard routes
  { path: '', redirectTo: '/home', pathMatch: 'full' },  // Redirect to Home
  { path: '**', redirectTo: '/home' },  // Wildcard route for invalid paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
