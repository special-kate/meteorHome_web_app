import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  public account: string;
  public password: string;
  public firstname: string;
  public lastname: string;
  public email: string;
  public phone: string;
  public balance:Number;
  msg: string;
  constructor(public http: HttpClient, private router: Router, private auth: AuthService) { }

  ngOnInit () {
    this.msg = ""
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.auth.getToken()}` }) };
    this.http.get('http://localhost:3000/me', httpOptions).subscribe((res: any) => {
      // console.log(res)


      this.account = res.data.account;
      this.password = res.data.password;
      this.firstname = res.data.firstname;
      this.lastname = res.data.lastname;
      this.email = res.data.email;
      this.phone = res.data.phone;
      this.balance = res.data.balance;
    })

  }

  update () {
    this.msg = ""
    const httpOptions = { headers: new HttpHeaders({'Authorization': `Bearer ${this.auth.getToken()}` }) };
    let api = 'http://localhost:3000/user';
    this.http.put(api, {
      "account": this.account,
      "password": this.password,
      "firstname": this.firstname,
      "lastname": this.lastname,
      "email": this.email,
      "phone": this.phone,
      "balance": this.balance,
    }, httpOptions).subscribe((response) => {
      //console.log(response);
      alert('update Successfully!')
      // this.router.navigate(['/login']);
    }, err => {
      this.msg = err.error.msg
      console.log(err)
    })
  }

  back () {
    this.router.navigate(['/login']);
  }

}
