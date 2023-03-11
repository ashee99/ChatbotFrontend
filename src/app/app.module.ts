import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterComplaintComponent } from './register-complaint/register-complaint.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ModelModule } from './model/model.module';
import { HttpClientModule } from '@angular/common/http';
import { ReportFraudComponent } from './report-fraud/report-fraud.component';
import { AccordionComponent } from './accordion/accordion.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LandingPageComponent,
    RegisterComplaintComponent,
    LoginPageComponent,
    ReportFraudComponent,
    AccordionComponent,
    
  ],
  imports: [
    
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ModelModule,
    HttpClientModule,
     AgmCoreModule.forRoot({
       apiKey:environment.googleMapsKey
     }),
      
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
