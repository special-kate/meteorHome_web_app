import { Component, OnInit } from '@angular/core';
import { Data } from '../../dataformat';
import { RentalmanagerService } from './rentalmanager.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rentalmanager',
  templateUrl: './rentalmanager.component.html',
  styleUrls: ['./rentalmanager.component.scss']
})
export class RentalmanagerComponent implements OnInit {
  locationlist: Array<string> = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','Washington D.C.'];
  listOfData:Data[];
  error:any;
  visible = false;

  // verify
  validateForm: FormGroup;

  constructor(public rentalmanagerService:RentalmanagerService,private fb: FormBuilder) {}

  ngOnInit(): void {
    this.showData();
    this.validateForm = this.fb.group({
      Formprice: [null, [Validators.required]],
      Formhome_type: [null, [Validators.required]],
      Formlocation: [null, [Validators.required]],
      Formgrossarea: [null, [Validators.required]],
      Formbathroom_no: [null, [Validators.required]],
      Formbedroom_no: [null, [Validators.required]],
      Formaddress:[null, [Validators.required]]
    });
  }

  open(): void {
    this.visible = !this.visible;
  }

  // get
  showData():void {
    this.rentalmanagerService.getData()
      .subscribe(
        rents => {
          this.rentalmanagerService.getCurrentUser().subscribe(
            currentUser=>{
              this.listOfData = rents.filter(item=>item.user_id === currentUser.data._id) 
            }
          ) 
        }, // success path
        error => this.error = error // error path
      );
  }

  // get value test
  submit_test():void{
    console.log(this.validateForm.get('Formprice').value);
  }

  // post:  create new data
  addnew(): void {
    // verify form
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.get('Formprice').value==undefined || this.validateForm.get('Formlocation').value==undefined 
    || this.validateForm.get('Formhome_type').value==undefined || this.validateForm.get('Formgrossarea').value==undefined 
    || this.validateForm.get('Formbedroom_no').value==undefined || this.validateForm.get('Formbathroom_no').value==undefined
    || this.validateForm.get('Formaddress').value==undefined){
      return;
    }else{
      // submit
      this.rentalmanagerService.getCurrentUser().subscribe(
        currentUser=>{
          let user_id = currentUser.data._id;
          let rentinuser_id = '';

          let home_description={
            "price":this.validateForm.get('Formprice').value,
            "location":this.validateForm.get('Formlocation').value,
            "home_type":this.validateForm.get('Formhome_type').value,
            "area":this.validateForm.get('Formgrossarea').value,
            "bedroom_no":this.validateForm.get('Formbedroom_no').value,
            "bathroom_no":this.validateForm.get('Formbathroom_no').value,
            "duration":12,
            "address":this.validateForm.get('Formaddress').value
          }

          let rentout={
            "rentout_id":"RO"+(new Date()).getTime().toString(),
            "rentout_price":this.validateForm.get('Formprice').value,
            "receive_rent":0,
            "home_availablestatus":true
          }

          let rentin={
            "rentin_id":"RI"+(new Date()).getTime().toString(),
            "home_status":false,
            "rentin_price":this.validateForm.get('Formprice').value,
            "already_payrent":0
          }

          const newData: Data = { user_id,rentinuser_id,home_description,rentout,rentin } as Data;

          this.rentalmanagerService.addData(newData).subscribe(data => this.listOfData.push(data));
          alert("create success!");
          this.open();
          this.showData();
        }
      ) 
    }
    
  }

  
  // put: cancel home
  update(data: any) {
    // judge home status & received rent
    if(data.rentout.home_availablestatus == false && data.rentout.receive_rent == 0){
      // change rentout home status
      data.rentout.home_availablestatus = true;
      // change renter rentin home status
      data.rentin.home_status = false;

      this.rentalmanagerService.updateData(data._id,data).subscribe();
      alert("cancel success!");
    }else{
      alert("Can't cancel!\nReasons: 1)already canceled 2)already paid by tenant");
    }
  
  }

  // delete: delete home
  delete(data:any): void {
    if (data.rentout.home_availablestatus == true){
      this.rentalmanagerService.deleteData(data._id).subscribe();
      alert('Delete Success');
      this.showData();
    }else{
      alert("Can't delete!\nReasons: 1)already rent out");
    }
  }
}
