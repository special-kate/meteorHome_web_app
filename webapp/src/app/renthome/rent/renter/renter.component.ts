import { Component, OnInit } from '@angular/core';
import { RenterService } from './renter.service';
import { Data } from '../../dataformat';

@Component({
  selector: 'app-renter',
  templateUrl: './renter.component.html',
  styleUrls: ['./renter.component.scss']
})
export class RenterComponent implements OnInit {
  listOfData:Data[];
  error:any;
  editData: Data;

  constructor(public renterService:RenterService) { }

  ngOnInit(): void {
    this.showData();
  }

  // get
  showData():void {
    this.renterService.getData().subscribe(
      rents => {
        this.renterService.getCurrentUser().subscribe(
          currentUser=>{
            this.listOfData = rents.filter(item=>item.rentinuser_id === currentUser.data._id);
          }
        ) 
      }, // success path
      error => this.error = error // error path
    );
  }

  // delete
  delete(data:any): void {
    this.listOfData = this.listOfData.filter(h => h !== data);
    this.renterService
      .deleteData(data._id)
      .subscribe();
    alert('Delete Success');
  }

  // put: pay money
  updatepay(rent: any) {
        this.renterService.getCurrentUser().subscribe(
          currentUser=>{
            if (currentUser.data.balance >= rent.rentin.rentin_price 
              && rent.rentout.rentout_price*rent.home_description.duration > rent.rentout.receive_rent
              && rent.rentin.rentin_price*rent.home_description.duration > rent.rentin.already_payrent
              && rent.rentin.home_status == true){
              this.renterService.searchUserById(rent.user_id).subscribe(
                owner=>{
                  
                  // add home owner balance
                  owner.balance += rent.rentout.rentout_price*rent.home_description.duration; 
                  // reduce user account balance
                  currentUser.data.balance -= rent.rentin.rentin_price*rent.home_description.duration; 
                  // reduce money of user
                  rent.rentin.already_payrent += rent.rentin.rentin_price*rent.home_description.duration;
                  // add money of home owner
                  rent.rentout.receive_rent += rent.rentout.rentout_price*rent.home_description.duration;
                  // update owner
                  this.renterService.updateUserById(owner).subscribe();
                  // update renter
                  this.renterService.updateCUser(currentUser.data).subscribe();
                  // update rent
                  this.renterService.updateData(rent._id,rent).subscribe();
                }
              )
              alert("Pay successfully");
            }else{
              alert("Not enough money or Already paid or Not error status");
            }
          }
        ) 
  }

  // put: cancel home & change status
  updatestatus(data: any) {
    // judge home status & already paid
    if(data.rentin.home_status == true && data.rentin.already_payrent == 0){
      // change renter rentin home status 
      data.rentin.home_status = false;
      // change rentout home status
      data.rentout.home_availablestatus = true;

      this.renterService
      .updateData(data._id,data)
      .subscribe();
      alert("Cancel success!");
    }else{
      alert("Can't cancel!\nReason: 1)Already canceled 2)Already paid landlord")
    }
    
  }

   // put: delete rent in user 
   updaterentinuser(data: any) {
    // time judge
    let odate = new Date(data.updateDate),
    y = odate.getFullYear(),
    m = odate.getMonth(),
    d = odate.getDate(),
    today = new Date();
    // judge home status & already paid
    if(data.rentin.home_status == true 
      && today.getFullYear() == y+1 && today.getMonth() == m && today.getDate() == d
      && data.rentin.already_payrent == data.rentin.rentin_price*data.home_description.duration){
      // change renter rentin home status 
      data.rentin.home_status = false;
      // change rentout home status
      data.rentout.home_availablestatus = true;
      // change rentinuser
      data.rentinuser_id = "";
      this.renterService.updateData(data._id,data).subscribe();
      alert("Delete success!");
    }else if(data.rentin.home_status == false){
      // change renter rentin home status 
      data.rentin.home_status = false;
      // change rentout home status
      data.rentout.home_availablestatus = true;
      // change rentinuser
      data.rentinuser_id = "";
      this.renterService.updateData(data._id,data).subscribe();
      alert("Delete success!");
      this.showData();
    }else{
      alert("Can't deleted!\nReason: 1)Already deleted 2)Not paid enough 3)Not expired time")
    }
    
  }

}
