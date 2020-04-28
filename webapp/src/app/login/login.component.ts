import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  //import HTML service
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userList: any[] = [];

  public account: string;
  public password: string;
  msg:string;

  constructor(public http: HttpClient, private router: Router,private auth: AuthService) { }

  ngOnInit () {

    if(this.auth.getToken()){
      this.router.navigate(['/'])
    }
  }


  login () {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    let api = 'http://localhost:3000/login';

    this.msg= ""
    this.http.post(api, { account: this.account, password: this.password },httpOptions).subscribe((response:any) => {
      // console.log(response);
      alert('login Successfully!')
      this.auth.setToken(response.token)
      this.router.navigate(['/'])
    },err=>{
      this.msg = err.error.msg;
    })
  }


}
