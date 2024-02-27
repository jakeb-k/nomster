import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { trigger, transition, style, query, stagger, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { GoalsService } from '../services/goals.service';
import { Goal } from '../interfaces/goal';
import { UpdateGoalModalComponent } from '../comps/update-goal-modal/update-goal-modal.component';
import { ResetService } from '../services/reset.service';


@Component({
  selector: 'app-profile-input',
  templateUrl: './profile-input.page.html',
  styleUrls: ['./profile-input.page.scss'],
  // animations: [
  //   trigger('listAnimation', [
  //     transition('* => *', [ // This will apply to each change in the item list
  //       query('.goalItem:enter', [
  //         style({ opacity: 0, transform: 'translateY(-100px)' }), // Initial state
  //         stagger(100, [ // 100ms delay between each item's animation
  //           animate('0.5s', style({ opacity: 1, transform: 'none' })) // Final state
  //         ])
  //       ], { optional: true })
  //     ])
  //   ])
  // ]
})
export class ProfileInputPage implements OnInit {
  // Property to store goals; type is any
  goals: any;

  // Array of goal types for selection
  types = ['Carbs Limit', 'Calorie Intake', 'Fat Limit', 'Protein Intake'];

  // Object to store a new goal with default values
  newGoal: Goal = {
    goalAmount: 0,
    type: '',
    goalProgress: 0
  };

  // Component to be used for the update goal modal
  modalComponent = UpdateGoalModalComponent;

  // Flag to show or hide the success message
  showSuccessMessage = Boolean();

  // Flag to indicate if goal update was successful
  goalUpdateSuccess = Boolean();

  // Flag to initialize the modal
  modalInit = false;

  /**
   * Constructor for the component.
   * @param router - Router service for navigation.
   * @param goalsService - Service for handling goals.
   * @param modalController - Controller for managing modals.
   */
  constructor(private router: Router, private goalsService: GoalsService, private modalController: ModalController, private resetService: ResetService) { }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Loads goals from the service and assigns them to the 'goals' property.
   */
  async ngOnInit() {
    this.goalsService.loadGoals();
    this.goals = this.goalsService.getGoals();
    await this.resetService.timeCheck(); 
  }

  /**
   * Navigates back to the login route.
   */
  back() {
    this.router.navigateByUrl('/login');
  }

  /**
   * Dismisses the currently active modal.
   */
  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  /**
   * Initializes a new goal and handles success or error scenarios.
   */
  async initGoal() {
    try {
      const isSuccess = await this.goalsService.addGoal(this.newGoal);
      if (isSuccess) {
        this.showSuccessMessage = true;
        this.goals = this.goalsService.getGoals();
        setTimeout(() => this.showSuccessMessage = false, 3000);
      }
    } catch (error) {
      console.error('Error adding goal:', error);
    }
    this.cancel();
  }

  /**
   * Deletes a goal by its ID.
   * @param goal - The goal to be deleted.
   */
  async deleteGoal(goal: Goal) {
    this.goalsService.deleteGoalById(goal.id!.toString())
  }

  /**
   * Sends the updated goal progress to the service.
   * @param id - The ID of the goal to be updated.
   * @param goalAmount - The updated goal amount.
   */
  async sendGoalProgress(id: number, goalAmount: number) {
    try {
      const isSuccess = await this.goalsService.updateGoal(id, goalAmount);
      if (isSuccess) {
        this.goalUpdateSuccess = true;
        this.goals = this.goalsService.getGoals();
        setTimeout(() => this.goalUpdateSuccess = false, 1500);
      }
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  }
  async resetGoalProgress(id:number) {
    try {
      const isSuccess = await this.goalsService.resetGoalProgress(id);
      if (isSuccess) {
        this.goalUpdateSuccess = true;
        this.goals = this.goalsService.getGoals();
        setTimeout(() => this.goalUpdateSuccess = false, 1500);
      }
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  }
  /**
   * Opens a modal for updating goal progress.
   * @param id - The ID of the goal for which the modal is opened.
   */
  async openModal(id: number) {
    const modal = await this.modalController.create({
      component: UpdateGoalModalComponent,
      componentProps: { 'id': id },
      cssClass: 'modal-transparent' 
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.handleModalData(dataReturned.data);
      }
    });

    return await modal.present();
  }
  /**
   * Handles the data returned from the goal update modal.
   * @param data - data[0] is the goal id and data[1] is the new progress
   */
  handleModalData(data: any) {
    this.sendGoalProgress(Number(data[0]), Number(data[1]));
  }

  getStreakArray(streak: number) {
    return new Array(7).fill(0).map((x, i) => i < streak);
  }

}
