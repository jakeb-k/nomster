import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  
  constructor(private modalController: ModalController) { }

  ngOnInit() {}
  //modal controller class that closes the modal, but sends the data in model
  sendData() {
    this.modalController.dismiss([this.id, this.macro], 'send');
  }
  //modal controller class that closes the modal, but returns null to ensure no data update
  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }
}
