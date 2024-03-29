import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent  implements OnInit {

  @Input() status:any = "";

  @Input() message = ""
  
  @Input() item:any; 
  
  styles = {
    icon: "",
    iconColor: "",
    color: "",
    bg: "",
  }
  gType = false; 
  noView = true; 

  constructor(private database: DatabaseService, private router: Router) { }
  
  ngOnInit() {
    this.status = JSON.parse(this.status); 
    this.gType = this.message == "Grocery was added!";
    this.updateCompByStatus(); 
  }
  async undoAddGrocery() {
    if (this.item) {
      try {
        await this.database.deleteGrocery(String(this.item.name));
      } catch (error) {
        console.error('Error undoing add grocery:', error);
      }
    }
  }
  navGoals() {
    if(this.message == "New favourite added!"){
      this.router.navigateByUrl('/favs'); 
    } 
    else if(this.message == "Added all groceries!") {
      this.router.navigateByUrl('/grocery'); 
    } 
    else {
      this.router.navigateByUrl('/profile-input'); 
    }
  }
  updateCompByStatus() {
    if(this.status) {
      this.styles.icon = "thumbs-up"
      this.styles.iconColor = "success"
      this.styles.color = "#3c763d"
      this.styles.bg = "#dff0d8"
    } else {
      this.noView = false; 
      this.styles.icon = "thumbs-down-outline"
      this.styles.iconColor = "danger"
      this.styles.color = "#763b3b"
      this.styles.bg = "#f0d7d7"
    }
  }

}
