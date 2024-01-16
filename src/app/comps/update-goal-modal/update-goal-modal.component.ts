import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-update-goal-modal',
  templateUrl: './update-goal-modal.component.html',
  styleUrls: ['./update-goal-modal.component.scss'],
})
export class UpdateGoalModalComponent  implements OnInit {
  @Input() id!: number; 
  @Output() modalData = new EventEmitter<any>();

  macro: number = 0; 
  
  constructor() { }

  ngOnInit() {}
  sendData() {
    this.modalData.emit({ id: this.id, data: this.macro });
  }
}
