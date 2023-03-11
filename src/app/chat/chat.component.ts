import { Component, DoCheck, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as jsonData from '../../assets/FAQ.json';
import { MapService } from '../map.service';
import { RestDataSource } from '../model/restdatasource';


export interface Message {
  type: string;
  message: {
    reply:any,
    url?:any,
    url1?:any,
    url2?:any
  }
  
}



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  
})
export class ChatComponent implements OnDestroy{

  private subscription: Subscription;
  locatorVar=false;
  textbox=true;
  reminder=true;
  loginlogout=true;
  data: any = jsonData;
  isOpen = false;
  loading = false;
  urlButtonVar=true;
  messages: Message[] = [];
  dataKeys:any[]=Object.keys(this.data);  
  img:string="../../assets/chatbot.png";
  refId!:string;
  url!:string;
  public locations: any[] =  [
    { name: 'Hadapsar', lat: 18.5089, lng: 73.9259, distance:"5Kms", img:"../../assets/locations/MicrosoftTeams-image (3).png",
      link:"https://www.bing.com/search?q=hadapsar+googlemaps&qs=n&form=QBRE&sp=-1&lq=0&pq=hadapsar+googlemaps&sc=8-19&sk=&cvid=012026CE961E489EAD8205524804024F&ghsh=0&ghacc=0&ghpl="},
    { name: 'Himjawadi', lat: 18.5913, lng: 73.7389, distance:"10Kms", img:"../../assets/locations/MicrosoftTeams-image (4).png",
    link:"https://www.bing.com/maps/directions?rtp=adr.%7Epos.18.54267692565918_73.93529510498047_Pune%2C+Maharashtra+411014_Pune%2C+Maharashtra+411014_%7Epos.18.580751419067383_73.74461364746094_Hinjewadi+Village%2C+Mulshi%2C+Maharashtra_Hinjewadi+Village%2C+Mulshi%2C+Maharashtra_&cp=18.555046%7E73.839405&lvl=12.2"},
    { name: 'Kothrud', lat: 18.5074, lng: 73.8077, distance:"1Kms", img:"../../assets/locations/MicrosoftTeams-image (2).png",
    link:"https://www.bing.com/search?q=kothrud+googlemaps&cvid=aac6a92fc4ff40168940d05aaa701993&aqs=edge..69i57j0.5931j0j1&pglt=43&FORM=ANNTA1&PC=U531"},
  ];

  

  chatForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });

  @ViewChild('scrollMe') private myScrollContainer: any;

  constructor(private router:Router, private datasource:RestDataSource, private mapService:MapService) {

    this.subscription = this.datasource.GetInterComponentCallFunSubject().subscribe(() => {
      this.InterComponentFun();
    });

    this.messages.push({
          type: 'client',
          message: {
            reply:'Hey! I am Nia, please select any of the options below or type in the chatbox.',
          }
        }); 
    
  }
  BackToHome(){
    this.messages.splice(1);
    this.chatForm.reset();
    this.urlButtonVar=true;
    this.locatorVar=false;
    if(sessionStorage.getItem("token")==null){
      this.loginlogout=true;
    }
    else{
      this.loginlogout=false;
    }
  }
 
  openSupportPopup() {
    this.isOpen = !this.isOpen;
    this.messages.splice(1);
    this.chatForm.reset();
    this.locatorVar=false;
    this.urlButtonVar=true;
    if(sessionStorage.getItem("token")==null){
      this.loginlogout=true;
    }
    else{
      this.loginlogout=false;
    }
  }

 
  urlButton(url:any){
    this.url=url;
    if(url=="Click here"){
      this.router.navigateByUrl("register-complaint");
      this.isOpen = !this.isOpen;
    // this.messages.splice(1);
    this.chatForm.reset();
    }
    // else if (url=="Continue"){
    //   this.messages.splice(-1);
    //   this.messages.push({
    //     type: 'client',
    //     message: {
    //       reply:'Done, Is there anything I can help you with?',
    //     }
    // }); 

    // }
    else if (url=="Login"){
      this.router.navigateByUrl("login");
      this.isOpen = !this.isOpen;
    // this.messages.splice(1);
    // this.chatForm.reset();
    }
    else if (url=="Logout"){
      this.loginlogout=true;
      this.messages.push({
        type: 'user',
        message: {
          reply:'Logout',
        }
      });
      this.urlButtonVar=false;
      this.messages.push({
        type: 'client',
        message: {
          reply:'Hey! You have successfully logged out.',
        }
      });
      this.scrollToBottom();
      this.logout();
    }
    else if(url=="report-fraud"){
      var token = sessionStorage.getItem("token")
      if(token==null){
        this.messages.push({
          type: 'user',
          message: {
            reply:'Report Fraud',
          }
      }); 
        this.messages.push({
          type: 'client',
          message: this.data["Login"],
        });
      }
      else{
        this.isOpen = !this.isOpen;
        this.router.navigateByUrl("report-fraud");
      }
    this.scrollToBottom();
    this.urlButtonVar=false;
    }
    else if(url=="Credit Card"){
      this.messages.push({
        type: 'user',
        message: {
          reply:'Credit Card',
        }
    }); 
      this.messages.push({
        type: 'client',
        message: this.data["Credit Card related issues"],
      });
      this.urlButtonVar=false;
      this.scrollToBottom();
    }
    else if(url=="Debit Card"){
      this.messages.push({
        type: 'user',
        message: {
          reply:'Debit Card',
        }
    }); 
      this.messages.push({
        type: 'client',
        message: this.data["Debit Card related issues"],
      });
      this.urlButtonVar=false;
      this.scrollToBottom();
    }
    else if(url=="Loan"){
      this.messages.push({
        type: 'user',
        message: {
          reply:'Loan',
        }
    }); 
      this.messages.push({
        type: 'client',
        message: this.data["Loan"],
      });
      this.urlButtonVar=false;
      this.scrollToBottom();
    }
    else if(url=='Send location'){
      var locationList=this.mapService.getUserLocation()
      locationList.sort( (a:any, b:any) =>{
            if (a.distance > b.distance) {return 1;}
            if (a.distance < b.distance){ return -1;}
            return 0;
         });
         console.log(locationList);
         
      this.locatorVar=true;
      this.scrollToBottom();
    } 
    else if(url=='Locator'){
      this.messages.push({
        type: 'user',
        message: {
          reply:'Locate ATM/Bank',
        }
    }); 
      this.messages.push({
        type: 'client',
        message: this.data["Locate nearest ATM/Branch"],
      });
      // this.locatorVar=true;

      this.urlButtonVar=false;
      this.scrollToBottom();
    }
    else if(url=="Cheque "){
      this.messages.push({
        type: 'user',
        message: {
          reply:'Cheque',
        }
    }); 
      this.messages.push({
        type: 'client',
        message: this.data["Cheque services"],
      });
      this.urlButtonVar=false;
      this.scrollToBottom();
    }
  }
  logout()
  {
    this.router.navigateByUrl("");
    sessionStorage.removeItem("refId");
    sessionStorage.removeItem('token'); 
    sessionStorage.removeItem('id'); 
  }
  sendMessage() {
    const sentMessage = this.chatForm.value.message!;
    this.loading = true;
    this.messages.push({
      type: 'user',
      message:{
        reply:sentMessage,
      } 
    });
    this.chatForm.reset();
    this.scrollToBottom();
    
    this.loading = false;
    if(this.dataKeys.includes(sentMessage)){
    this.messages.push({
          type: 'client',
          message: this.data[sentMessage],
        });
      this.scrollToBottom();
    }
    else{
      this.messages.push({
        type: 'client',
        message: {
          reply:"Sorry! could not process request, Kindly choose from the suggestions.",
        }
      });
    }
    this.urlButtonVar=false;
  }

  scrollToBottom() {
    setTimeout(() => {
      try {
        this.myScrollContainer.nativeElement.scrollTop =
          this.myScrollContainer.nativeElement.scrollHeight + 500;
      } catch (err) {}
    }, 150);
  }

  reminderFun(){
    this.urlButtonVar=!this.urlButtonVar;
    this.textbox=!this.textbox;
    this.reminder = !this.reminder;
    this.locatorVar=false;
  }

  InterComponentFun(){
    this.isOpen = !this.isOpen;
    if(this.url=='report-fraud'){
      this.messages.push({
        type: 'user',
        message: {
          reply:'Report fraud',
        }
    }); 
    this.refId=this.datasource.GetRefId();
        this.messages.push({
         type: 'client',
         message: {
           reply:'Your report has been registered successfully with reference ID: '+this.refId,
           
         }
       });
       this.urlButtonVar=false;
       this.scrollToBottom();
    }
    else if(this.url=='Login'){
      this.messages.push({
        type: 'user',
        message: {
          reply:'Login',
        }
    }); 
    this.refId=this.datasource.GetRefId();
        this.messages.push({
         type: 'client',
         message: {
           reply:'Logged in successfully',
         }
       });
       this.urlButtonVar=false;
       this.scrollToBottom();
    }
    else if(this.url=='Click here'){
      this.messages.push({
        type: 'user',
        message: {
          reply:'Register a complaint',
        }
    }); 
    this.refId=this.datasource.GetRefId();
    
        this.messages.push({
         type: 'client',
         message: {
           reply:'Your complaint has been registered successfully with reference ID: '+this.refId,
         }
       });
       this.urlButtonVar=false;
       this.scrollToBottom();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }




}
