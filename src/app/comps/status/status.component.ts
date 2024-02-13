import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent  implements OnInit {

  @Input() status = "";

  @Input() message = ""

  styles = {
    icon: "",
    iconColor: "",
    color: "",
    bg: "",
  }
  

  constructor() { }

  ngOnInit() {
    this.status = JSON.parse(this.status); 
    console.log(this.status); 
    this.updateCompByStatus(); 
  }

  updateCompByStatus() {
    if(this.status) {
      this.styles.icon = "thumbs-up"
      this.styles.iconColor = "success"
      this.styles.color = "#3c763d"
      this.styles.bg = "#dff0d8"
    } else {
      this.styles.icon = "thumbs-down-outline"
      this.styles.iconColor = "danger"
      this.styles.color = "#763b3b"
      this.styles.bg = "#f0d7d7"
    }
    
  }
}
