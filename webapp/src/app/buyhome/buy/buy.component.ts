import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {
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
