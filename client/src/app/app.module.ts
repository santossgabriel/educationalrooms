import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { AppMaterialModule } from './app-material.module'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ImageUploadModule } from "angular2-image-upload";

import { HeaderInterceptor } from './interceptors/header.interceptor'
import { ResponseInterceptor } from './interceptors/response.interceptor'

import { ConfirmEqualValidatorDirective } from './helpers/confirm-equal-validator.directive'

import { AppComponent } from './app.component'
import { ToolbarComponent } from './toolbar/toolbar.component'
import { FooterComponent } from './footer/footer.component'
import { HomeComponent } from './home/home.component'
import { AboutComponent } from './about/about.component'
import { SigninComponent } from './account/signin/signin.component'
import { SignupComponent } from './account/signup/signup.component'
import { AllQuestionsComponent } from './questions/all-questions/all-questions.component'
import { MyQuestionsComponent } from './questions/my-questions/my-questions.component'
import { QuestionModalComponent } from './modals/question-modal.component'
import { ConfirmModalComponent, ErrorModalComponent } from './modals/confirm-modal.component'
import { MyRoomsComponent } from './room/my-rooms/my-rooms.component';
import { OpenedRoomsComponent } from './room/opened-rooms/opened-rooms.component';
import { EditRoomComponent } from './room/edit-room/edit-room.component';
import { AssociatedRoomsComponent } from './room/associated-rooms/associated-rooms.component'
import { RoomQuestionModalComponent } from './modals/room-question-modal.component';
import { NotificationModalComponent } from './modals/notification-modal.component';
import { QuizComponent } from './room/quiz/quiz.component';

const components = [
  AppComponent,
  ToolbarComponent,
  FooterComponent,
  HomeComponent,
  AboutComponent,
  SigninComponent,
  SignupComponent,
  AllQuestionsComponent,
  MyQuestionsComponent,
  ConfirmEqualValidatorDirective,
  QuestionModalComponent,
  ConfirmModalComponent,
  ErrorModalComponent,
  MyRoomsComponent,
  OpenedRoomsComponent,
  RoomQuestionModalComponent,
  EditRoomComponent,
  AssociatedRoomsComponent,
  NotificationModalComponent,
  QuizComponent
]

const routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'sign-edit', component: SignupComponent },
  { path: 'my-questions', component: MyQuestionsComponent },
  { path: 'all-questions', component: AllQuestionsComponent },
  { path: 'my-rooms', component: MyRoomsComponent },
  { path: 'opened-rooms', component: OpenedRoomsComponent },
  { path: 'edit-room/:id', component: EditRoomComponent },
  { path: 'associated-rooms', component: AssociatedRoomsComponent },
  { path: 'quiz/:id', component: QuizComponent }
]

@NgModule({
  declarations: components,
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { useHash: true }),
    FlexLayoutModule,
    ImageUploadModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true }
  ],
  entryComponents: [
    QuestionModalComponent,
    ConfirmModalComponent,
    NotificationModalComponent,
    ErrorModalComponent,
    RoomQuestionModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }