import { AllQuizComponent } from './all-quiz/all-quiz.component';
import { ProfileComponent } from './profile/profile.component';
import { ResultComponent } from './results/result/result.component';
import { TrainingComponent } from './training/training.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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





const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },  // Dashboard Route
  { path: 'start-quiz/:id', component: StartQuizComponent }, // Start Quiz Route
  { path: 'quiz-detail/:id', component: QuizDetailComponent },  // quiz-detail Route
  { path: 'training', component: TrainingComponent },  // quiz-detail Route
  { path: 'result', component: ResultComponent },  // result Route
  { path: 'about-us', component: AboutUsComponent }, // about-us Route
  { path: 'contact-us', component: ContactUsComponent }, // contact-us Route
  { path: 'privacy-policy', component: PrivacyPolicyComponent }, // privacy-policy Route
  { path: 'terms-of-service', component: TermsOfServiceComponent }, // terms-of-service Route
  { path: 'profile', component: ProfileComponent }, // terms-of-service Route
  { path: 'update-profile', component: UpdateProfileComponent }, // update-profile Route
  { path: 'login', component: LoginComponent }, // login Route
  { path: 'register', component: RegisterComponent }, // register Route
  { path: 'home', component: HomeComponent }, // Home Route
  { path: 'all-quiz', component: AllQuizComponent }, // all-quiz Route
  { path: 'view-detail-answer', component: ViewDetailAnswerComponent },

  // Admin Route
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'admin/category-list', component: CategoryListComponent },
  { path: 'admin/category-add', component: CategoryAddComponent },
  { path: 'admin/quiz-list', component: AdminQuizListComponent },
  { path: 'admin/quiz-add', component: AdminQuizAddComponent },
  { path: 'admin/users', component: UserListComponent },
  { path: 'admin/result', component: ResultListComponent },
  { path: 'admin/settings', component: SettingsComponent },



  { path: '', redirectTo: '/home', pathMatch: 'full' },  // Default route to home
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
