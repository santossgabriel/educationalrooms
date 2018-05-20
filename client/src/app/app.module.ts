import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'
import { ToolbarComponent } from './toolbar/toolbar.component'
import { FooterComponent } from './footer/footer.component'
import { HomeComponent } from './home/home.component'
import { AboutComponent } from './about/about.component'
import { SinginComponent } from './account/singin/singin.component'
import { SingupComponent } from './account/singup/singup.component'
import { AppMaterialModule } from './app-material.module'


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    SinginComponent,
    SingupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'signin',
        component: SinginComponent
      },
      {
        path: 'signup',
        component: SingupComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
