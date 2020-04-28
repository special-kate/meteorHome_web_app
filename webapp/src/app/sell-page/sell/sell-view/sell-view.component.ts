import { Component, OnInit } from '@angular/core';
import { SellViewService } from './sell-view.service';
import { Data } from '../../data-format';

@Component({
  selector: 'app-sell-view',
  templateUrl: './sell-view.component.html',
  styleUrls: ['./sell-view.component.scss']
})
export class SellViewComponent implements OnInit {
  listOfData:Data[];
  error:any;
  editData: Data;
  listOfSellData:Data[];

  constructor(public sellViewService:SellViewService) { }

  ngOnInit(): void {
    this.showData();
  }

  // get
  showData():void {
    this.sellViewService.getData().subscribe(
      sells => {
        this.sellViewService.getCurrentUser().subscribe(
          currentUser=>{
            this.listOfData = sells.filter(item=>item.user_id === currentUser.data._id);
            this.listOfSellData = this.listOfData.filter(item=>item.sellout.home_available_status === false);
          }
        ) 
      }, // success path
      error => this.error = error // error path
    );
  }

  // delete
  delete(data:any): void {
    this.listOfData = this.listOfData.filter(h => h !== data);
    this.sellViewService
      .deleteData(data._id)
      .subscribe();
    alert('Delete Success');
  }

  // put: pay money
  updatepay(sell: any) {
        this.sellViewService.getCurrentUser().subscribe(
          currentUser=>{
            if (currentUser.data.balance >= sell.selllin.sellin_price 
              && sell.sellout.sellout_price > sell.sellout.receive_sell
              && sell.sellin.sellin_price > sell.sellin.already_pay_sell){
              this.sellViewService.searchUserById(sell.user_id).subscribe(
                owner=>{
                  
                  // add home owner balance
                  owner.balance += sell.sellout.sellout_price; 
                  // reduce user account balance
                  currentUser.data.balance -= sell.sellin.sellin_price; 
                  // reduce money of user
                  sell.sellin.already_pay_sell += sell.sellin.sellin_price;
                  // add money of home owner
                  sell.sellout.receive_sell += sell.sellout.sellout_price;
                  // update owner
                  this.sellViewService.updateUserById(owner).subscribe();
                  // update seller
                  this.sellViewService.updateCUser(currentUser.data).subscribe();
                  // update sell
                  this.sellViewService.updateData(sell._id,sell).subscribe();
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
      // change seller sellin home status 
      data.sellin.home_status = false;
      // change sellout home status
      data.sellout.home_available_status = true;

      this.sellViewService
      .updateData(data._id,data)
      .subscribe();
      alert("Cancel success!");
    }else{
      alert("Can't cancel!\nReason: 1)Already cancelled 2)Already paid landlord")
    }
    
  }

   // put: delete sell in user 
   updatesellinuser(data: any) {
    // time judge
    let odate = new Date(data.updateDate),
    y = odate.getFullYear(),
    m = odate.getMonth(),
    d = odate.getDate(),
    today = new Date();
    // judge home status & already paid
    if(data.sellin.home_status == true 
      && today.getFullYear() == y+1 && today.getMonth() == m && today.getDate() == d
      && data.sellin.already_pay_sell == data.sellin.sellin_price){
      // change seller sellin home status 
      data.sellin.home_status = false;
      // change sellout home status
      data.sellout.home_available_status = true;
      // change sellin user
      data.sellin_user_id = "";

      this.sellViewService.updateData(data._id,data).subscribe();
      alert("Delete success!");
    }else{
      alert("Can't deleted!\nReason: 1)Already deleted 2)Not paid enough 3)Not expired time")
    }
    
  }

}
