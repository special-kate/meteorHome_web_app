import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isVisible = false;
  isLoggedIn: Observable<boolean>;
  constructor(private auth: AuthService, private http: HttpClient, private router: Router,private message: NzMessageService) { }

  ngOnInit (): void {
    this.isLoggedIn = this.auth.isLoggedIn();

  }

  logout () {
    this.auth.setToken(null);
    this.router.navigate(['/'])
  }

  createBasicMessage(): void {
    this.message.success('Please call 1 0101010, or email: meteorhome@meteorrent.com for help', {
      nzDuration: 2000
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleModal(): void {
    this.isVisible = !this.isVisible;
  }

}
