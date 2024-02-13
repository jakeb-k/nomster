import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent  implements OnInit {
  // Input property for a favourite item
  @Input() props = {
    status: Boolean(), 
    message: "",
  };
  styles = {
    icon: "",
    iconColor: "",
    color: "",
    bg: "",
  }
  

  constructor() { }

  ngOnInit() {}

  updateCompByStatus() {
    if(this.props.status) {
      this.styles.icon = "thumbs-up-outline"
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
