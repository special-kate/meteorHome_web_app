import { Component, OnInit, ViewChild, ElementRef, NgZone} from '@angular/core';
import { SearchhomeService } from './searchhome.service';
import { Data } from '../../dataformat';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import {} from 'googlemaps';
@Component({
  selector: 'app-searchhome',
  templateUrl: './searchhome.component.html',
  styleUrls: ['./searchhome.component.scss']
})
export class SearchhomeComponent implements OnInit {
  bedroomNum:number;
  bathroomNum:number;
  grossarea:Array<Number>=[1000,7500];
  selectedprice:number;
  selectedhometype:string;
  selectedsort:string;
  locationlist: Array<string> = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','Washington D.C.'];
  listOfSelectedLocation:string;
  homelist:Data[];
  error:any;

  @ViewChild('search')
  public searchElementRef:ElementRef;

  public latitude: number;
  public longitude: number;
  // location: object;
  public zoom: number ;
  public latlongs: any = [];
  public latlong: any = {};
  public searchControl: FormControl;


  constructor(public searchhomeService:SearchhomeService,private mapsAPILoader:MapsAPILoader
    ,private ngZone:NgZone) {}
  
  ngOnInit(): void {
    this.latitude = 42.30442810058594;
    this.longitude = -71.11002349853516;
    this.zoom = 8;
    this.searchControl = new FormControl();
    this.setCurrentPosition();

    this.mapsAPILoader.load().then(()=>{
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement,{
        types: [],
        componentRestrictions:{'country':'US'}
      });

      autocomplete.addListener('place_changed',()=>{
        this.ngZone.run(()=>{
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if(place.geometry === undefined||place.geometry===null){
            return;
          }

          const latlong = {
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng()
          };

          this.latlongs.push(latlong);
          this.searchControl.reset();
        });
      })
    })
     this.showData();
  //   this.searchhomeService.getLocation().subscribe(data=>{
  //     console.log(data);
  //     this.lat = data.latitude;
  //     this.lng = data.longitude;
  //   })
   }

  public setCurrentPosition(){
    if ('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((position)=>{
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;

      });
    }
  }

  // sort json
  jsonSort(array:any, field:any, reverse:any) {
    if(array.length < 2 || !field || typeof array[0] !== "object") return array;
    if(typeof array[0]['home_description'][field] === "number") {
      array.sort(function(x:any, y:any) { return x['home_description'][field] - y['home_description'][field]});
    }

    if(typeof array[0]['home_description'][field] === "string") {
      array.sort(function(x:any, y:any) { return x['home_description'][field].localeCompare(y['home_description'][field])});
    }

    if(reverse) {
      array.reverse();
    }
    return array;
  }

  // sort
  sort():void{
    if(this.selectedsort=='Price(low-high)'){
      this.homelist = this.jsonSort(this.homelist,"price",false)
    }else if(this.selectedsort=='Price(high-low)'){
      this.homelist = this.jsonSort(this.homelist,"price",true)
    }
    else if(this.selectedsort=='Bedroom Number'){
      this.homelist = this.jsonSort(this.homelist,"bedroom_no",false)
    }else if(this.selectedsort=='Bathroom Number'){
      this.homelist = this.jsonSort(this.homelist,"bathroom_no",false)
    }else{
      this.homelist = this.jsonSort(this.homelist,"user_id",false)
    }
  }

  // get
  showData():void {
    this.searchhomeService.getData()
      .subscribe(
        data => {
          this.homelist = data.filter(item=>item.sellout.home_available_status===true);
          this.grossarea = undefined;
          this.selectedhometype =undefined;
          this.listOfSelectedLocation = undefined;
          this.selectedprice = undefined;
          this.bedroomNum = undefined;
          this.bathroomNum = undefined;
        }, // success path
        error => this.error = error // error path
      );
      
  }

  // get one by condition
  search() {
    if (this.selectedprice || this.selectedhometype || this.listOfSelectedLocation || this.grossarea || this.bedroomNum || this.bathroomNum) {
      this.searchhomeService
        .searchOne(this.selectedprice,this.selectedhometype,this.listOfSelectedLocation,this.grossarea,this.bedroomNum,this.bathroomNum)
        .subscribe(data => (this.homelist = data));
    }
  }

  // put: buy home
  update(data: any) {
    if(data.sellout.home_available_status == true){
      
      this.searchhomeService.getCurrentUser()
      .subscribe(
        currentUser => {
          if (currentUser.data._id) {
            if ( currentUser.data._id !== data.user_id){
              // change selected buyout status
              data.sellout.home_available_status = false;
              // change selected buyin user
              data.sellin_user_id = currentUser.data._id;
              // change buyin status
              data.sellin.home_status = true;
            
              this.searchhomeService.updateData(data._id,data).subscribe();
              alert("Buy success!");
              this.showData();
            }else{
              alert("Sorry, you can't buy your own home");
            }

          }

        }
      );
      
    }
    else{
      alert("Not available!");
    }
    
  }

}
