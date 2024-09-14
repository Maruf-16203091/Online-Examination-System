import { ResultComponent } from './results/result/result.component';
import { TrainingComponent } from './training/training.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StartQuizComponent } from './quizzes/start-quiz/start-quiz.component';
import { QuizDetailComponent } from './quizzes/quiz-detail/quiz-detail.component';





const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },  // Dashboard Route
  { path: 'start-quiz', component: StartQuizComponent }, // Start Quiz Route
  { path: 'quiz-detail', component: QuizDetailComponent },  // quiz-detail Route
  { path: 'training', component: TrainingComponent },  // quiz-detail Route
  { path: 'result', component: ResultComponent },  // result Route



  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },  // Default route to Dashboard
  { path: '**', redirectTo: '/dashboard' }  // Fallback route for any invalid paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
