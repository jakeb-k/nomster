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
    if ((now - this.timeStamp) > 86400000) {
      console.log('timestamp is fucking you for some unknown reason', now,'-',this.timeStamp)
      try {
        await this.goalsService.updateGoalStreak(); 
        await this.goalsService.resetAllGoalProgress(); 
        await this.userService.updateUserTimestamp(this.timeStamp); 
        
      }
     catch (error) {
      console.error('error doing reset: '+ error)
      }
    }
  }
}
