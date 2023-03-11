import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public lat:number=0;
  lng:number=0;
  public places: Array<any> = [];
  public abcd: Array<any>=[];
  public abcde: Array<any>=[];
 // public sortedArray:any[]=[];

  constructor(private http:HttpClient) { }

  getUserLocation():any{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position=>{
        this.lat=position.coords.latitude;
         this.lng=position.coords.longitude;
    });
  
  return this.abcd;

}

 
}
 getDistance(){
  this.places= [
    { name: 'Kozhichena', lat: 11.000012673214027, lng: 75.95462328816744 },
    { name: 'EDARIKODE', lat: 10.995588167416244, lng: 75.9792820292842},
    { name: 'PUTHANATHANI', lat: 10.934239290002912, lng: 76.0025444809232}
  ];
  const url = 'https://api.openrouteservice.org/v2/directions/driving-car';
  const headers = { 'Authorization': '5b3ce3597851110001cf62483677843ab4f34b51a0a127abc5f1a3d4' };
  this.places.forEach(place => {
    const params = {
      'coordinates': [[this.lng, this.lat], [place.lng, place.lat]],
      'units': 'km'
    };
    // console.log(this.lat+"hiii"+"\n"+this.lng);
    this.http.post(url, params, { headers }).subscribe((data: any) => {
      const distance = data.routes[0].segments[0].distance;
      place.distance = distance;
      // console.log(data);
      this.abcd.push(place);
    });
  });
  // window.addEventListener('load',()=>{
    
  // })
  
  // this.abcde=this.abcd;
  //   console.log(this.abcd)
  //   this.abcde.sort( (a, b) =>{
  //     if (a.distance > b.distance) {return 1;}
  //     if (a.distance < b.distance){ return -1;}
  //     return 0;
      
  //  });
  console.log(this.abcd);
 
  // var sortedArray:Array<any>= [
  //   { name: 'Kozhichena', lat: 11.000012673214027, lng: 75.95462328816744,distance:1111.67 },
  //   { name: 'EDARIKODE', lat: 10.995588167416244, lng: 75.9792820292842,distance:1106.89},
  //   { name: 'PUTHANATHANI', lat: 10.934239290002912, lng: 76.0025444809232,distance:1109.98}
  // ];
  // console.log(sortedArray);
  // sortedArray.sort( (a, b) =>{
  //       if (a.distance > b.distance) {return 1;}
  //       if (a.distance < b.distance){ return -1;}
  //       return 0;
  //    });
  // console.log(sortedArray);
  //  window.addEventListener('load',()=>{
  //    this.sortTheArray();
  //     });
  
//   this.abcd.sort( (a, b) =>{
//     if (a.distance > b.distance) {return 1;}
//     if (a.distance < b.distance){ return -1;}
//     return 0;
//  });
 
  // var sorted = this.sortTheArray(this.abcd);
  // console.log(sorted)
  // var numericArray:Array<any> = [{ name: 'Kozhichena', lat: 11.000012673214027, lng: 75.95462328816744 ,distance:1106.982},
  // { name: 'EDARIKODE', lat: 10.995588167416244, lng: 75.9792820292842,distance:1111.541},
  // { name: 'PUTHANATHANI', lat: 10.934239290002912, lng: 76.0025444809232,distance:1109.836}];
  // // console.log(numericArray);
  //  numericArray.sort((n1,n2)=> {
  //   if(n1.distance > n2.distance) return 1;
  //   if(n1.distance < n2.distance) return -1;
  //   return 0;})
   // console.log(numericArray);



 // console.log(this.places);
 // console.log(this.abcd);


//  this.abcd.sort((n1,n2)=> {
//    if(n1.distance > n2.distance) return 1;
//    if(n1.distance < n2.distance) return -1;
//    console.log(this.abcd);
//    return 0;

//   });

// console.log(this.abcd);
 


  
  
  //console.log(this.abcd);
  //this.sortTheArray()

}

// async sortTheArray(){
//   await
//   this.abcd.sort( (a, b) =>{
//          if (a.distance > b.distance) {return 1;}
//          if (a.distance < b.distance){ return -1;}
//          return 0;
//       });
//       console.log("hello");

//   // console.log(this.abcd+"myre")
// //   this.sortedArray=this.abcd.sort( (a, b) =>{
// //      if (a.distance > b.distance) {return 1;}
// //      if (a.distance < b.distance){ return -1;}
// //      return 0;
     
// //   });
// //     console.log(this.abcd) 
// //     console.log(this.sortedArray) 
// //   //this.abcd.sort((a,b)=>(a.distance<b.distance? -1 : 1));
// //  // console.log(this.abcd);
// }

}
