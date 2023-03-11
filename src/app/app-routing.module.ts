import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccordionComponent } from './accordion/accordion.component';
import { ChatComponent } from './chat/chat.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterComplaintComponent } from './register-complaint/register-complaint.component';
import { ReportFraudComponent } from './report-fraud/report-fraud.component';

const routes: Routes = [
  {path:"",component:LandingPageComponent},
  {path:"login",component:LoginPageComponent},
  {path:"register-complaint",component:RegisterComplaintComponent},
  {path:"report-fraud",component:ReportFraudComponent},
   {path:"accordion",component:AccordionComponent},
   
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
