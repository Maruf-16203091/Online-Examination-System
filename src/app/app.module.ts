import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for Angular Material
import { MatToolbarModule } from '@angular/material/toolbar'; // For Navbar
import { MatButtonModule } from '@angular/material/button'; // For Buttons
import { MatCardModule } from '@angular/material/card'; // For Cards
import { MatInputModule } from '@angular/material/input'; // For Input fields (Login/Register forms)
import { MatFormFieldModule } from '@angular/material/form-field'; // For Form fields
import { MatIconModule } from '@angular/material/icon'; // For icons in buttons or forms
import { MatListModule } from '@angular/material/list'; // For lists (quiz lists)
import { MatTableModule } from '@angular/material/table'; // For tables (results admin)
import { MatPaginatorModule } from '@angular/material/paginator'; // For pagination in tables
import { MatSidenavModule } from '@angular/material/sidenav'; // For Side navigation bar
import { MatMenuModule } from '@angular/material/menu'; // For menu items (in navbar)
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // For loaders/spinners
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
import { StartQuizComponent } from './quizzes/start-quiz/start-quiz.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';




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
    NavbarComponent,
    StartQuizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,         // Navbar
    MatButtonModule,          // Buttons (e.g., Submit, Take Quiz)
    MatCardModule,            // Card layout (for quizzes, results, etc.)
    MatInputModule,           // Input fields (login, register)
    MatFormFieldModule,       // Form fields for better layout
    MatIconModule,            // Icons (optional for buttons)
    MatListModule,            // Lists for quizzes or profile items
    MatTableModule,           // Tables for displaying results
    MatPaginatorModule,       // Pagination for tables
    MatSidenavModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    FormsModule,
    MatRadioModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
