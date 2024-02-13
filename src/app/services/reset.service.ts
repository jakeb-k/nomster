import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ResetService {
  user:any; 
  timeStamp: any; 
  constructor(private userService: UserService) {

   }
   
   async timeCheck() {

    this.user = await this.userService.loadUserByPromise();
    this.timeStamp = this.user.timeStamp;
    console.log("timestamp: ", this.timeStamp) 
    const now = new Date().getTime();

    // Check if more than 24 hours have passed
    if (now - this.timeStamp > 60 * 1000) {
      console.log('its been a minute')
      return true
    } else {
      console.log('it has not been a minute')
      return false
    }
   }
}
