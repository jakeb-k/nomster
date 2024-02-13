import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { GoalsService } from './goals.service';

@Injectable({
  providedIn: 'root'
})
export class ResetService {
  user:any; 
  timeStamp: any; 
  constructor(private userService: UserService, private goalsService: GoalsService) {

   }
   
   async timeCheck() {

    this.user = await this.userService.loadUserByPromise();
    this.timeStamp = this.user.timeStamp;
    const now = new Date().getTime();

    // Check if more than 24 hours have passed
    if (now - this.timeStamp > 24 * 60 * 60 * 1000) {
      await this.goalsService.resetAllGoalProgress(); 
      await this.userService.updateUserTimestamp(this.timeStamp); 
      return true
    } else {
      return false
    }
   }
}
