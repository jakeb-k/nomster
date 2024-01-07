import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';
import { IonModal, ModalController } from '@ionic/angular';
import { Grocery } from '../interfaces/grocery';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  users:any; 
  groceries:any; 
  newUserName = ''; 
  
  calorieIntake = sessionStorage.getItem('calorieIntake'); 

  constructor(private database: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.database.loadGrocery(); 
    this.groceries = this.database.getGrocery(); 
  }

  nav(path:string){
    this.router.navigateByUrl('/'+path); 
  }
  home(){
    this.router.navigateByUrl('/'); 
  }

}
