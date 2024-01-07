import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Grocery } from '../interfaces/grocery';
import { Router } from '@angular/router';


@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.page.html',
  styleUrls: ['./grocery.page.scss'],
})
export class GroceryPage implements OnInit {

  groceries:any; 

  constructor(private database: DatabaseService, private router:Router) { }

  ngOnInit() {
    this.database.loadGrocery(); 
    this.groceries = this.database.getGrocery(); 
  }
  IonViewWillEnter(){
    this.database.loadGrocery(); 
    this.groceries = this.database.getGrocery(); 
  }
  async deleteGrocery(grocery: Grocery) {
    await this.database.deleteGroceryById(grocery.id.toString()); 
    this.groceries = this.database.getGrocery(); 

  }

  nav(path:string){
    this.router.navigateByUrl('/'+path); 
  }

}
