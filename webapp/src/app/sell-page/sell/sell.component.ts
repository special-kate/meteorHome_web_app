import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {
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
