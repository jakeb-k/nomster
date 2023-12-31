import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { User } from '../interfaces/user';
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
  constructor(private database: DatabaseService, private router: Router, private modalController: ModalController) { }

  ngOnInit() {
    this.database.loadGrocery(); 
    this.groceries = this.database.getGrocery(); 
  }

  async createUser() {
    await this.database.addUser(this.newUserName); 
    this.newUserName = '';  
  }
  async updateUser(user: User) {
    const active = user.active ? 1 : 0; 
    this.database.updateUserById(user.id.toString(), active); 
    
  }
  async deleteUser(user: User) {
    this.database.deleteUserById(user.id.toString()); 
  }
  fav(){
    this.router.navigateByUrl('/favs'); 
  }
  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }
  
  async deleteFav(grocery: Grocery) {
    this.database.deleteFavById(grocery.id.toString()); 
  }
}
