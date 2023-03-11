import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, ConnectableObservable, Subject } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { Complain } from "./Complaint.model";
import { Fraud } from "./Fraud.model";

const PROTOCOL = "http";
const PORT = 8000;

@Injectable()
export class RestDataSource{
    auth_token?:string;
    baseUrl:string ;
    private interComponentCallFunSubject = new Subject<void>();
    refId!:string;  

    constructor(private http: HttpClient) {
      this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
      
    }



    InterComponentCallFun() {
      this.interComponentCallFunSubject.next();
    }
    GetInterComponentCallFunSubject() {
      return this.interComponentCallFunSubject.asObservable();
    }

    authenticate(username: string, password: string): Observable<any> {
        
        // const payload = { UserName:username,Password:password}
        return this.http.post<any>(this.baseUrl+"api/Bank/LoginUser", {username,password} )
              .pipe(catchError((error) => {
                return error.message;
              }));
              
              
      }

    GetUser():Observable<any>{
      return this.http.get<any>(this.baseUrl+"api/Bank/"+sessionStorage.getItem("id"))
      .pipe(catchError((error) => {
        return error.message;
      }));

    }

    AddComplain(complain:Complain):Observable<any>
    {
       
       return this.http.post<any>(this.baseUrl+"api/Bank/register-complain",complain).pipe(catchError((error)=>{
        return error.message;
       
       }));
    }
    ReportFraud(fraud:Fraud):Observable<any>
    {
      // var token=sessionStorage.getItem("token");
      // var httpHeaders=new HttpHeaders().set("Authorization","Bearer"+token)
      // console.log(token);
      
       return this.http.post<any>(this.baseUrl+"api/Bank/report-fraud",fraud).pipe(catchError((error)=>{
        return error.message;
       
       }));
    }

    SetRefId(value:string){
      this.refId=value;
    }
    GetRefId():string{
      console.log(this.refId+"janko")
      return this.refId;
    }


    // FindDistance(params:any){
    //   const headers = {'Authorization':'Bearer 5b3ce3597851110001cf62483677843ab4f34b51a0a127abc5f1a3d4'};
    //   const url = 'https://api.openrouteservice.org/v2/directions/driving-car';
    //   return this.http.post(url,params,{headers}).pipe(catchError((error)=>{
    //     return error.message;
       
    //    }));
    // }
}