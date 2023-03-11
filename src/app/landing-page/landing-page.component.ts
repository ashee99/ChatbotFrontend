import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements DoCheck {
  loginlogout=true;
  mySubscription?:Subscription;
  constructor(private router:Router) { 

  if(sessionStorage.getItem("token")==null){
    this.loginlogout=true;
  }
  else{
    this.loginlogout=false;
  }
  }
  
  ngDoCheck(): void {
    if(sessionStorage.getItem("token")==null){
      this.loginlogout=true;
    }
    else{
      this.loginlogout=false;
    }
  }
 
  
  logout()
  {
    this.loginlogout=true;
    this.router.navigateByUrl("")
    sessionStorage.removeItem('token'); 
    sessionStorage.removeItem('id'); 
  }

}
