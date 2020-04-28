import { Component, OnInit } from '@angular/core';
import { Data } from '../../data-format';
import { SellManagerService } from './sell-manager.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sell-manager',
  templateUrl: './sell-manager.component.html',
  styleUrls: ['./sell-manager.component.scss']
})
export class SellManagerComponent implements OnInit {
  locationlist: Array<string> = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','Washington D.C.'];
  listOfData:Data[];
  error:any;
  newVisible = false;
  updateVisible = false;
  tempData:any;

  // verify
  validateForm: FormGroup;

  constructor(public sellManagerService:SellManagerService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.showData();
    this.validateForm = this.fb.group({
      Formprice: [null, [Validators.required]],
      Formhome_type: [null, [Validators.required]],
      Formlocation: [null, [Validators.required]],
      Formgrossarea: [null, [Validators.required]],
      Formbathroom_no: [null, [Validators.required]],
      Formbedroom_no: [null, [Validators.required]],

    });
  }

  openNew(): void {
    this.newVisible = !this.newVisible;
    this.validateForm.get('Formprice').setValue(undefined);
    this.validateForm.get('Formlocation').setValue(undefined); 
    this.validateForm.get('Formhome_type').setValue(undefined);
    this.validateForm.get('Formgrossarea').setValue(undefined); 
    this.validateForm.get('Formbedroom_no').setValue(undefined);
    this.validateForm.get('Formbathroom_no').setValue(undefined);
  }

  openUpdate(): void {
    this.updateVisible = !this.updateVisible;
  }

  // get
  showData():void {
    this.sellManagerService.getData()
      .subscribe(
        sells => {
          this.sellManagerService.getCurrentUser().subscribe(
            currentUser=>{
              this.listOfData = sells.filter(item=>item.user_id === currentUser.data._id) 
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
    || this.validateForm.get('Formbedroom_no').value==undefined || this.validateForm.get('Formbathroom_no').value==undefined){
      return;
    }else{
      // submit
      this.sellManagerService.getCurrentUser().subscribe(
        currentUser=>{
          let user_id = currentUser.data._id;
          let sellin_user_id = '';

          let home_description={
            "price":this.validateForm.get('Formprice').value,
            "location":this.validateForm.get('Formlocation').value,
            "home_type":this.validateForm.get('Formhome_type').value,
            "area":this.validateForm.get('Formgrossarea').value,
            "bedroom_no":this.validateForm.get('Formbedroom_no').value,
            "bathroom_no":this.validateForm.get('Formbathroom_no').value
          }

          let sellout={
            "sellout_id":"SO"+(new Date()).getTime().toString(),
            "sellout_price":this.validateForm.get('Formprice').value,
            "receive_sell":0,
            "home_available_status":true
          }

          let sellin={
            "sellin_id":"SI"+(new Date()).getTime().toString(),
            "home_status":false,
            "sellin_price":this.validateForm.get('Formprice').value,
            "already_pay_sell":0
          }

          const newData: Data = { user_id,sellin_user_id,home_description,sellout,sellin} as Data;

          this.sellManagerService.addData(newData).subscribe(data => this.listOfData.push(data));
          alert("create success!");
          this.openNew();
          this.showData();
        }
      ) 
    }
    
  }

  
  // put: cancel home
  update(data: any) {
    this.updateVisible = !this.updateVisible;
    this.tempData = data;
    // judge home status & received sell
    if(data.sellout.receive_sell == 0){
      this.validateForm.get('Formprice').setValue(data.home_description.price);
      this.validateForm.get('Formlocation').setValue(data.home_description.location);
      this.validateForm.get('Formhome_type').setValue(data.home_description.home_type);
      this.validateForm.get('Formgrossarea').setValue(data.home_description.area); 
      this.validateForm.get('Formbedroom_no').setValue(data.home_description.bedroom_no);
      this.validateForm.get('Formbathroom_no').setValue(data.home_description.bathroom_no);
    }else{
      alert("Can't update!\nReasons: already paid by customer");
    }
  }

  updateData() {
    // verify form
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.get('Formprice').value==undefined || this.validateForm.get('Formlocation').value==undefined 
    || this.validateForm.get('Formhome_type').value==undefined || this.validateForm.get('Formgrossarea').value==undefined 
    || this.validateForm.get('Formbedroom_no').value==undefined || this.validateForm.get('Formbathroom_no').value==undefined){
      return;
    }
    else {
      // submit
      this.sellManagerService.getCurrentUser().subscribe(
        currentUser=>{
          let user_id = currentUser.data._id;
          let sellin_user_id = '';

          let home_description={
            "price":this.validateForm.get('Formprice').value,
            "location":this.validateForm.get('Formlocation').value,
            "home_type":this.validateForm.get('Formhome_type').value,
            "area":this.validateForm.get('Formgrossarea').value,
            "bedroom_no":this.validateForm.get('Formbedroom_no').value,
            "bathroom_no":this.validateForm.get('Formbathroom_no').value
          }

          let sellout=this.tempData.sellout;

          let sellin=this.tempData.sellin;

          const updateData: Data = { user_id,sellin_user_id,home_description,sellout,sellin} as Data;

          this.sellManagerService.updateData(this.tempData._id, updateData).subscribe(data => this.listOfData.push(data));
          alert("Update success!");
          this.openUpdate();
          this.showData();
        }
      )
    }

  }

  // delete: delete home
  delete(data:any): void {
    if (data.sellout.home_available_status == true){
      this.sellManagerService.deleteData(data._id).subscribe();
      alert('Delete Success');
      this.showData();
    }else{
      alert("Can't delete!\nReasons: 1)already sell out");
    }
  }
}
