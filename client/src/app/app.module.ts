import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { AppMaterialModule } from './app-material.module'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { HeaderInterceptor } from './interceptors/header.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';

import { AppComponent } from './app.component'
import { ToolbarComponent } from './toolbar/toolbar.component'
import { FooterComponent } from './footer/footer.component'
import { HomeComponent } from './home/home.component'
import { AboutComponent } from './about/about.component'
import { SinginComponent } from './account/singin/singin.component'
import { SingupComponent } from './account/singup/singup.component'
import { AllQuestionsComponent } from './questions/all-questions/all-questions.component'
import { MyQuestionsComponent } from './questions/my-questions/my-questions.component'



const components = [
  AppComponent,
  ToolbarComponent,
  FooterComponent,
  HomeComponent,
  AboutComponent,
  SinginComponent,
  SingupComponent,
  AllQuestionsComponent,
  MyQuestionsComponent
]

const routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'signin', component: SinginComponent },
  { path: 'signup', component: SingupComponent },
  { path: 'my-questions', component: AllQuestionsComponent },
  { path: 'all-questions', component: MyQuestionsComponent }
]

@NgModule({
  declarations: components,
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
