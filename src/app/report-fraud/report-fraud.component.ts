import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestDataSource } from '../model/restdatasource';

@Component({
  selector: 'app-report-fraud',
  templateUrl: './report-fraud.component.html',
  styleUrls: ['./report-fraud.component.css']
})
export class ReportFraudComponent {
   
  constructor(private datasource:RestDataSource,private fb:FormBuilder,private router:Router)
  {
  this.fraudForm = this.createFormGroup();
  }
    fraudForm:FormGroup;
  
  createFormGroup(){
    return this.fb.group({
      Email: new FormControl('', [Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      FraudType: new FormControl('', [Validators.required]),
      FraudDate: new FormControl('', [Validators.required]),
      FraudAmount: new FormControl('', [Validators.required]),
      Details:new FormControl('')
    });
  }
  get f()  
 {
  return this.fraudForm.controls;
 }
 reportfraud()
 {
  this.datasource.ReportFraud(this.fraudForm.value).subscribe(response=>{
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
