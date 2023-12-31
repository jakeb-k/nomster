import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  users:any; 

  newUserName = ''; 
  constructor(private database: DatabaseService, private router: Router) { }

  ngOnInit() {
    //this.users = this.database.getUsers(); 
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

}
