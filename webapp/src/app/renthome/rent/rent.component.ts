import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent implements OnInit {
  theme = false;
  visible = false;
  placement = 'left';

  open(): void {
    this.visible = !this.visible;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
