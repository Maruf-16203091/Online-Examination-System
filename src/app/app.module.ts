import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizCreateComponent } from './quizzes/quiz-create/quiz-create.component';
import { QuestionFormComponent } from './quizzes/question-form/question-form.component';
import { QuizDetailComponent } from './quizzes/quiz-detail/quiz-detail.component';
import { QuizTakeComponent } from './quizzes/quiz-take/quiz-take.component';
import { ResultComponent } from './results/result/result.component';
import { ResultsAdminComponent } from './results/results-admin/results-admin.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    QuizListComponent,
    QuizCreateComponent,
    QuestionFormComponent,
    QuizDetailComponent,
    QuizTakeComponent,
    ResultComponent,
    ResultsAdminComponent,
    ProfileComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
