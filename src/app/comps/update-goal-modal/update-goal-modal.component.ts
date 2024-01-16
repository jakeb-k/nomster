import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-update-goal-modal',
  templateUrl: './update-goal-modal.component.html',
  styleUrls: ['./update-goal-modal.component.scss'],
})
export class UpdateGoalModalComponent  implements OnInit {
  @Input() id!: number; 

  macro: number = 0; 
  
  constructor(private modalController: ModalController) { }

  ngOnInit() {}
  sendData() {
    this.modalController.dismiss([this.id, this.macro], 'send');
  }
  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }
}
