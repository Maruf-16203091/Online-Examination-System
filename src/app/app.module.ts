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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './quizzes/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from './shared/header/header.component';
import { TrainingComponent } from './training/training.component';
import { MatSelectModule } from '@angular/material/select';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { FooterComponent } from './shared/footer/footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { HomeComponent } from './home/home.component';
import { AllQuizComponent } from './all-quiz/all-quiz.component';
import { ViewDetailAnswerComponent } from './view-detail-answer/view-detail-answer.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { SideNavComponent } from './admin/side-nav/side-nav.component';
import { CategoryListComponent } from './admin/category/category-list/category-list.component';
import { CategoryAddComponent } from './admin/category/category-add/category-add.component';
import { EditCategoryDialogComponent } from './admin/category/edit-category-dialog/edit-category-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminQuizListComponent } from './admin/quiz/quiz-list/quiz-list.component';
import { EditQuizDialogComponent } from './admin/quiz/edit-quiz-dialog/edit-quiz-dialog.component';
import { AdminQuizAddComponent } from './admin/quiz/quiz-add/quiz-add.component';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { UserListComponent } from './admin/user/user-list/user-list.component';
import { ResultListComponent } from './admin/result/result-list/result-list.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ConfirmDialogComponent } from './confirmation/confirm-dialog/confirm-dialog.component';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    QuizListComponent,
    QuestionFormComponent,
    QuizDetailComponent,
    QuizTakeComponent,
    ResultComponent,
    ResultsAdminComponent,
    ProfileComponent,
    NavbarComponent,
    StartQuizComponent,
    DialogComponent,
    HeaderComponent,
    TrainingComponent,
    FooterComponent,
    AboutUsComponent,
    ContactUsComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    UpdateProfileComponent,
    HomeComponent,
    AllQuizComponent,
    ViewDetailAnswerComponent,
    AdminDashboardComponent,
    SideNavComponent,
    CategoryAddComponent,
    CategoryListComponent,
    EditCategoryDialogComponent,
    AdminQuizListComponent,
    EditQuizDialogComponent,
    AdminQuizAddComponent,
    UserListComponent,
    ResultListComponent,
    SettingsComponent,
    ConfirmDialogComponent
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
    MatRadioModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    BaseChartDirective,
    MatTableModule,
    HttpClientModule,
    MatSnackBarModule,
    NgxMatTimepickerModule,
    MatSlideToggleModule




  ],
  providers: [provideCharts(withDefaultRegisterables())],
  bootstrap: [AppComponent]
})
export class AppModule { }
