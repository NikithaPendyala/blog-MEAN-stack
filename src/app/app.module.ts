import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {AuthGuard} from './auth/auth.guard';
import {AuthinterceptorService} from './auth/authinterceptor.service'

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { NavigationComponent } from './home/navigation/navigation.component';
import {AuthService} from './auth/auth.service';
import {PostservService} from './posts/postserv.service';
import { CreatepostComponent } from './posts/createpost/createpost.component';
import { ListpostComponent } from './posts/listpost/listpost.component';
import { DetailComponent } from './posts/detail/detail.component';
import { AddcommentsComponent } from './posts/addcomments/addcomments.component';
import { EditComponent } from './posts/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    WelcomeComponent,
    NavigationComponent,
    CreatepostComponent,
    ListpostComponent,
    DetailComponent,
    AddcommentsComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path:"home",component:WelcomeComponent, canActivate:[AuthGuard]},
      {path:"login",component:LoginComponent},
      {path:"register",component:RegistrationComponent},
      {path:"createpost",component:CreatepostComponent, canActivate:[AuthGuard]},
      {path:"listpost",component:ListpostComponent, canActivate:[AuthGuard]},
      {path:"listpost/:pid",component:DetailComponent, canActivate:[AuthGuard]},
      {path:"", redirectTo:"login", pathMatch:"full"},
      //invalid routes
      {path:"**", redirectTo:"login"}
    ])

  ],
  providers: [AuthService,PostservService, CookieService,AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthinterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
