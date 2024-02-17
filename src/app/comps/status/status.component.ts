import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent  implements OnInit {

  @Input() status = "";

  @Input() message = ""
  
  @Input() item:any; 
  
  styles = {
    icon: "",
    iconColor: "",
    color: "",
    bg: "",
  }
  gType = false; 

  constructor(private database: DatabaseService, private router: Router) { }
  
  ngOnInit() {
    this.status = JSON.parse(this.status); 
    this.gType = this.message == "Grocery was added!";
    this.updateCompByStatus(); 
  }
  async undoAddGrocery() {
    if (this.item) {
      try {
        const isSuccess = await this.database.deleteGrocery(String(this.item.name));
        if (isSuccess) {
          console.log('grocery was unadded')
          this.item = null; // Reset the reference
        } else {
          console.log('grocery was not unadded')
        }
      } catch (error) {
        console.error('Error undoing add grocery:', error);
      }
    }
  }
  navGoals() {
    this.router.navigateByUrl('/profile-input'); 
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
