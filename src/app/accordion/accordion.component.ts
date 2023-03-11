import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RestDataSource } from '../model/restdatasource';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {
  // @ViewChild('myCarousel')myCarousel:any;

  // ngAfterViewInit(){
  //   this.myCarousel.cycle()
  // }
  // map!: google.maps.Map;
  lat!:number;
  lng!:number;
  map: any;
  public locations: any[] =  [
    { name: 'Hadapsar', lat: 18.5089, lng: 73.9259, distance:"5Kms", img:"../../assets/locations/MicrosoftTeams-image (3).png"},
    { name: 'Himjawadi', lat: 18.5913, lng: 73.7389, distance:"10Kms", img:"../../assets/locations/MicrosoftTeams-image (4).png"},
    { name: 'Kothrud', lat: 18.5074, lng: 73.8077, distance:"1Kms", img:"../../assets/locations/MicrosoftTeams-image (2).png"}
  ];
  public places: any[] = [];
  constructor(private http:HttpClient) {}
  public currentPos:any[]=[]
   getUserLocation():any{
     if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(position=>{
         this.lat=position.coords.latitude;
          this.lng=position.coords.longitude;
          // this.currentPos[0]=this.lat;
          // this.currentPos[1]=this.lng;
          // console.log(this.currentPos);
          // console.log(this.lat);
          // console.log(this.lng);
          

         });
         }
         
        }


        // ---------------------------------------------------------------------------------

  // map:any;
  // directionsService!: google.maps.DirectionsService;
  // directionsRenderer!: google.maps.DirectionsRenderer;
  // // constructor() { }
  // ngAfterViewInit() {
  //   this.directionsService = new google.maps.DirectionsService();
  //   this.directionsRenderer = new google.maps.DirectionsRenderer();

  //   // const mapElement = document.getElementById('mapContainer')!;
  //   // this.map = new google.maps.Map(mapElement, {
  //   // center: { lat: 37.7749, lng: -122.4194 },
  //   // zoom: 12,
  //   // });
    
  //   // this.directionsRenderer.setMap(this.map);
    
  //   const start = new google.maps.LatLng(37.7749, -122.4194);
  //   const end = new google.maps.LatLng(37.3363, -121.8903);
    
  //   const request = {
  //   origin: start,
  //   destination: end,
  //   travelMode: google.maps.TravelMode.DRIVING,
  //   };
    
  //   this.directionsService.route(request, (response, status) => {
  //   if (status == google.maps.DirectionsStatus.OK) {
  //   this.directionsRenderer.setDirections(response);
    
  //   const distance = response?.routes[0]?.legs[0]?.distance?.text;
  //   console.log(distance);
  //   } else {
  //   console.error(status);
  //   }
  //   });
  //   }
  // // ngOnInit(): void {
  // //   google.maps.event.addDomListener(window,'load',()=>{
  // //     this.findNearbyPlaces(37.7749, -122.4194)
  // //   })
  // // }

  // findNearbyPlaces(lat: number, lng: number) {
  //   const service = new google.maps.places.PlacesService(document.createElement('div'));
  //   const location = new google.maps.LatLng(lat, lng);
  //   const request:google.maps.places.PlaceSearchRequest = {
  //     location,
  //     radius: 5000, // Change this value to set the radius of the search
  //     type: 'restaurant' // Change this value to set the type of places to search for
  //   };
  //   service.nearbySearch(request, (results, status) => {
  //     if (status === google.maps.places.PlacesServiceStatus.OK) {
  //       console.log(results);
  //       // Do something with the results
  //     }
  //   });
  // }
  // -------------------------------------------------------------------------------------------------

  ngOnInit(){  
    // this.myCarousel.cycle()
    this.getUserLocation();
    console.log(this.lat);
    console.log(this.lng);
    // this.lat=this.currentPos[0];
    // this.lng=this.currentPos[1];

    this.places= [
      { name: 'Place A', lat: 18.5089, lng: 73.9259 },
      { name: 'Place B', lat: 18.5913, lng: 73.7389 },
      { name: 'Place C', lat: 18.5074, lng: 73.8077 }
    ];

    const url = 'https://api.openrouteservice.org/v2/directions/driving-car';
    const headers = { 'Authorization': '5b3ce3597851110001cf6248367' };
    this.places.forEach(place => {
    const params = {
      'coordinates': [[73.943, 18.5478], [place.lng, place.lat]],
      'units': 'mi'
    };

    // this.datasource.FindDistance(params).subscribe((data: any) =>{
    //   const distance = data.features[0].properties.segments[0].distance;
    //   place.distance = distance;
    //   console.log(distance)   '5b3ce3597851110001cf62483677843ab4f34b51a0a127abc5f1a3d4'
    // });
    
    this.http.post(url, params, { headers },).subscribe((data: any) => {
      const distance = data.routes[0].segments[0].distance
      place.distance = distance;
      
      console.log(data);

      console.log(place);
    });
    });
    
  }
}
