import { Component } from '@angular/core';

@Component({
  selector: 'drag-root',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.css']
})
export class DragComponent {
//https://medium.com/@svsh227/implement-drag-and-drop-in-angular-2-4-5-6-f27f210a0245
  
  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }
}