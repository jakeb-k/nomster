import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GoalsService } from 'src/app/services/goals.service';
@Component({
  selector: 'app-update-goal-modal',
  templateUrl: './update-goal-modal.component.html',
  styleUrls: ['./update-goal-modal.component.scss'],
})
  //only needs to send data back, so good not to couple
export class UpdateGoalModalComponent  implements OnInit {
  //id is passed in through ng loop of goals
  @Input() id!: number; 

  macro: number = 0; 
  
  /**
   * Initializes the component with ModalController.
   * @param modalController - Controller for managing modals.
   */
  constructor(private modalController: ModalController, private goalsService: GoalsService) { }

  ngOnInit() {}
  /**
   * Sends data back from the modal and closes it.
   * Dismisses the modal with the 'send' role and passes the id and macro data.
   */
  sendData() {
    this.modalController.dismiss([this.id, this.macro], 'send');
  }
  /**
   * Closes the modal without sending data.
   * Dismisses the modal with the 'cancel' role and ensures no data update.
   */
  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  async deleteGoal(){
    try {
      await this.goalsService.deleteGoalById(this.id.toString())
    } catch (error) {
      console.log('error deleting from goal modal: ',error)
    }
    this.cancel(); 
  }
}
