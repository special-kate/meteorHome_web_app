import { Component, OnInit } from '@angular/core';
import { BuyerService } from './buyer.service';
import { Data } from '../../dataformat';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss']
})
export class BuyerComponent implements OnInit {
  listOfData:Data[];
  error:any;
  editData: Data;

  constructor(public buyerService:BuyerService) { }

  ngOnInit(): void {
    this.showData();
  }

  // get
  showData():void {
    this.buyerService.getData().subscribe(
      sells => {
        this.buyerService.getCurrentUser().subscribe(
          currentUser=>{
            this.listOfData = sells.filter(item=>item.sellin_user_id === currentUser.data._id);
          }
        ) 
      }, // success path
      error => this.error = error // error path
    );
  }

  // delete
  delete(data:any): void {
    this.listOfData = this.listOfData.filter(h => h !== data);
    this.buyerService
      .deleteData(data._id)
      .subscribe();
    alert('Delete Success');
  }

  // put: pay money
  updatepay(buy: any) {
        this.buyerService.getCurrentUser().subscribe(
          currentUser=>{
            if (currentUser.data.balance >= buy.sellin.sellin_price 
              && buy.sellout.sellout_price > buy.sellout.receive_sell
              && buy.sellin.sellin_price > buy.sellin.already_pay_sell){
              this.buyerService.searchUserById(buy.user_id).subscribe(
                owner=>{
                  
                  // add home owner balance
                  owner.balance += buy.sellout.sellout_price; 
                  // reduce user account balance
                  currentUser.data.balance -= buy.sellin.sellin_price; 
                  // reduce money of user
                  buy.sellin.already_pay_sell += buy.sellin.sellin_price;
                  // add money of home owner
                  buy.sellout.receive_sell += buy.sellout.sellout_price;
                  // update owner
                  this.buyerService.updateUserById(owner).subscribe();
                  // update buyer
                  this.buyerService.updateCUser(currentUser.data).subscribe();
                  // update buy
                  this.buyerService.updateData(buy._id,buy).subscribe();
                }
              )
              alert("Pay successfully");
            }else{
              alert("Not enough money or Already paid");
            }
          }
        ) 
  }

  // put: cancel home & change status
  updatestatus(data: any) {
    // judge home status & already paid
    if(data.sellin.home_status == true && data.sellin.already_pay_sell == 0){
      // change buyer buyin home status 
      data.sellin.home_status = false;
      // change buyout home status
      data.sellout.home_available_status = true;

      this.buyerService
      .updateData(data._id,data)
      .subscribe();
      alert("Cancel success!");
    }else{
      alert("Can't cancel!\nReason: 1)Already canceled 2)Already paid landlord")
    }
    
  }

   // put: delete buy in user 
   updatebuyinuser(data: any) {
    // time judge
    let odate = new Date(data.updateDate),
    y = odate.getFullYear(),
    m = odate.getMonth(),
    d = odate.getDate(),
    today = new Date();
    // judge home status & already paid
    if(data.sellin.home_status == true 
      && data.sellin.already_pay_sell == data.sellin.sellin_price){
      // change buyer buyin home status 
      data.sellin.home_status = false;
      // change buyout home status
      data.sellout.home_available_status = true;
      // change buyinuser
      data.sellin_user_id = "";

      this.buyerService.updateData(data._id,data).subscribe();
      alert("Delete success!");
      this.showData();
    }else if(data.sellin.home_status == false){
      // change buyer buyin home status 
      data.sellin.home_status = false;
      // change buyout home status
      data.sellout.home_available_status = true;
      // change buyinuser
      data.sellin_user_id = "";
      this.buyerService.updateData(data._id,data).subscribe();
      alert("Delete success!");
      this.showData();
    }else{
      alert("Can't deleted!\nReason: 1)Already deleted 2)Not paid enough")
    }
    
  }

}
