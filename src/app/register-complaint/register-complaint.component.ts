import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RestDataSource } from '../model/restdatasource';
@Component({
  selector: 'app-register-complaint',
  templateUrl: './register-complaint.component.html',
  styleUrls: ['./register-complaint.component.css']
})
export class RegisterComplaintComponent {
  
  
  

  constructor(private datasource:RestDataSource, private fb:FormBuilder,private router:Router) 
  { this.regForm = this.createFormGroup();}
  regForm:FormGroup;
  dateTime:Date = new Date();
  
  createFormGroup(){
    return this.fb.group({
      Name: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      ComplaintDate: new FormControl(this.dateTime, [Validators.required]),
      Subject: new FormControl('', [Validators.required]),
      Complaint: new FormControl('', [Validators.required]),
    });
  }
  get f()  
  {
   return this.regForm.controls;
  }

registerComplaint(){
  this.datasource.AddComplain(this.regForm.value).subscribe(response=>{
    
    this.datasource.SetRefId(response.referenceId);
    this.router.navigateByUrl("");
    this.datasource.InterComponentCallFun();
   });
  }
  
  logout()
  {
    this.router.navigateByUrl("")
    sessionStorage.removeItem('token'); 
    sessionStorage.removeItem('id'); 
  }
}
