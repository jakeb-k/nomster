import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GoalsService } from '../services/goals.service';
import { Goal } from '../interfaces/goal';
import { IonModal, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-profile-input',
  templateUrl: './profile-input.page.html',
  styleUrls: ['./profile-input.page.scss'],
})
export class ProfileInputPage implements OnInit {
  goals:any;  

  types = ['Carbs Limit', 'Calorie Limit', 'Fat Limit', 'Protein Intake']

  newGoal:Goal = {
    goalAmount: 0,
    type: '',
  }
  showSuccessMessage = Boolean(); 

  constructor(private router: Router, private goalsService: GoalsService, private modalController: ModalController) { } 

  ngOnInit() {
    // this.goalsService.loadGoals(); 
    // this.goals = this.goalsService.getGoals(); 
  }

  back(){
    this.router.navigateByUrl('/login'); 
  }
  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  async initGoal(){
    // try {
    //   const isSuccess = await this.goalsService.addGoal(this.newGoal);
    //   if (isSuccess) {
    //     this.showSuccessMessage = true; // Display success message
    //     this.goals = this.goalsService.getGoals();  
    //     setTimeout(() => {
    //       this.showSuccessMessage = false; // Hide success message after a delay
    //     }, 3000); // Adjust the delay (in milliseconds) as needed
    //   }
    // } catch (error) {
    //   console.error('Error adding grocery:', error);
    //   // Handle error scenarios here
    // }
    
  }
}
