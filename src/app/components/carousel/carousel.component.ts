import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-carousel-basic',
  templateUrl: './basic.html',
  styleUrls: ['./carousel.component.css']
})
export class DemoCarouseBasicComponent {
  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

}