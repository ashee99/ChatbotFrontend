import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestDataSource } from '../model/restdatasource';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {



  // title=""
  submit=false;
  


  visible:boolean = true;
  changetype:boolean = true;
 // isAuthenticate:boolean=false;

  // viewpass(){
  //   this.visible = !this.visible;
  //   this.changetype = !this.changetype;
  // }

  public username: any;
  public password: any;
  public Password: any;
  public token?: any;
 public id?:any;
  public errorMessage?: string;
  public Eid?: number;
  
  

  constructor(private router: Router, private datasource: RestDataSource,private fb:FormBuilder) { }


  loginForm=this.fb.group({
    username:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required]),
  })

  get f(){
    return this.loginForm.controls;
   }

  //  onsubmit(){
  //   this.submit=true;
  //   console.log();
  //  }
   

  show = true;

  ngOnInit() {
    this.password = 'password';
  }

  onClickEye() {
    if (this.password === 'password') {
      console.log("Hii");
      this.password = 'text';
      this.show = false;
    } else {
      console.log("Hello");
      this.password = 'password';
      this.show = true;
    }
    // this.show=true;

  }
  // }
  // onClickEye(){
  //   this.show = true;
  // }

  
  authenticate() {
  
 
    // // this.auth.authentication();
    // if(form.valid) {

       
    // }
    // else {
    //   this.errorMessage = "Form Data Invalid";
    //   //this.isAuthenticate=false;
    // }
this.username=this.loginForm.controls.username.value;
this.Password=this.loginForm.controls.password.value;
  
    

    this.datasource.authenticate(this.username , this.Password)
        .subscribe(response => {       
          this.token = response.token;
          this.id=response.userId;
          // console.log(response);
          // console.log(this.id);
          if(this.token != null){
            sessionStorage.setItem("token", this.token);
            sessionStorage.setItem("id", this.id);
            this.router.navigateByUrl("");
          }
          else {
            this.errorMessage = "Unauthorized Access!!";
            //this.isAuthenticate=false;
            
          }
          this.datasource.InterComponentCallFun();
        });


  }
  

}
