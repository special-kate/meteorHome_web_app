import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  getaction(e:any){
    if(e.target.value=='rent'){
      this.router.navigate(['rent']);
    }

    if(e.target.value=='sell'){
      this.router.navigate(['sell']);
    }

    if(e.target.value=='buy'){
      this.router.navigate(['buy']);
    }
  }
}
