import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoalsService } from '../services/goals.service';


@Component({
  selector: 'app-profile-input',
  templateUrl: './profile-input.page.html',
  styleUrls: ['./profile-input.page.scss'],
})
export class ProfileInputPage implements OnInit {
  goals:any; 

  constructor(private router: Router, private goalsService: GoalsService) { } 

  ngOnInit() {
    this.goalsService.loadGoals(); 
    this.goals = this.goalsService.getGoals(); 
  }
  back(){
    this.router.navigateByUrl('/login'); 
  }
}
