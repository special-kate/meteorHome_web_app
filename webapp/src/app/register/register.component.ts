import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';  //import HTML service
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public account: string;
  public password: string;
  public firstname: string;
  public lastname: string;
  public email: string;
  public phone: string;
  public balance: Number;
  msg:string;
  constructor(public http:HttpClient,private router:Router) { }

  ngOnInit(){
    this.msg = ""
    
  }

  add(){
    this.msg= ""
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    let api='http://localhost:3000/signup/new';
    this.http.post(api,{
      "account": this.account,
      "password": this.password,
      "firstname": this.firstname,
      "lastname": this.lastname,
      "email": this.email,
      "phone": this.phone,
      "balance": this.balance
    }, httpOptions).subscribe((response)=>{
      //console.log(response);
      alert('Added Successfully!')
      this.router.navigate(['/login']);
    },err=>{
      this.msg = err.error.msg
      console.log(err.error.msg)
    })
  }
  
  back(){
    this.router.navigate(['/login']);
  }




  // 定义提交表单事件
  
}
