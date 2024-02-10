import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { GoalsService } from '../services/goals.service';
import { User } from '../interfaces/user';
import { Goal } from '../interfaces/goal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  goals:any; 

  dateInput!: string; 

  user:any; 

  selectedIcon: string | null = null;
  selectedGenderIcon: string | null = null; 

  gIcons = [
    { label: 'Man', value: '0', name: 'woman-outline' },
    { label: 'Woman', value: '1', name: 'man-outline' },
  ];

  wIcons = [
    { label: 'Loss', value: '-1', name: 'caret-down-outline' },
    { label: 'Maintain', value: '0', name: 'checkmark-outline' },
    { label: 'Gain', value: '1', name: 'caret-up-outline' },
  ];

  activityLevels = [
    { level: "Sedentary: little or no exercise", factor: 1.2 },
    { level: "Lightly active: exercise 1-3 times a week", factor: 1.375 },
    { level: "Moderately active: exercise 4-5 times a week", factor: 1.55 },
    { level: "Very active: daily exercise", factor: 1.725 },
    { level: "Super active: very physical job or 2x daily exercise", factor: 1.9 }
  ]; 

  newUser: User = {
    name: '',
    id: 0,
    gender:0,
    height: 0,
    weight: 0,
    direction: 0,
    age: 0,
    activityLevel: 0
  }
  isNew = true;  
  constructor(private userService: UserService, private router: Router, private goalsService: GoalsService) { }

  async ngOnInit() {
    await this.loadGoalCheck(); 
  }
  async ionViewWillEnter(){
    await this.loadGoalCheck(); 
  }
  selectIcon(value: string) {
    this.selectedIcon = value;
  }
  selectIcon2(value: string) {
    this.selectedGenderIcon = value;
  }

  sendUser() {
    this.newUser.age =  this.calculateAge(this.dateInput) 
    this.newUser.gender = Number(this.selectedGenderIcon) 
    this.newUser.direction =  Number(this.selectedIcon) 

    

    this.caloricIntakeGoalInit(Number(this.calculateCI(this.newUser).toFixed(0)));
    this.setCaloricIntakeGoal(); 
    this.userService.addUser(this.newUser); 
    this.router.navigateByUrl('/login')

  }

  /**
   * Uses Date object to calculate difference between today and inputted date
   * and return the age of someone born on the inputted date
   * @param birthDateString - The inputted date
   * @returns The users age 
   */
  calculateAge(birthDateString: string) {
    const birthDate = new Date(birthDateString);
    const today = new Date();
  
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
  
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  }
  
  /**
   * Takes user input to calculate desired caloric intake
   * Uses Mifflin-St Jeor Equation to calculate BMR, then multiply by activity rate for TDEE
   * Than +/- or do nothing based on user choice
   * @param user - The user info that is used
   */
  calculateCI(user: User){
    let imbalance = 0;
    if(this.newUser.direction == -1) {
      imbalance = -750; 
    } 
    else if(this.newUser.direction == 1) {
      imbalance = 350; 
    }
    if (user.gender === 0) {
      return ((10 * user.weight + 6.25 * user.height - 5 * user.age + 5) * user.activityLevel) + imbalance;
    } else {
      return ((10 * user.weight + 6.25 * user.height - 5 * user.age - 161) * user.activityLevel)+ imbalance;
    }
  }

  setCaloricIntakeGoal() {
    let CI = this.calculateCI(this.newUser).toFixed(2)
    sessionStorage.setItem('caloricIntake', CI); 
  }

  async caloricIntakeGoalInit(CI: number) {
    let x: Goal = {
      goalAmount: CI,
      goalProgress: 0,
      type: 'Calorie Intake'
    }
    try {
      await this.goalsService.addGoal(x)
    } 
    catch(err) {
      console.error('Error with setting CI', err)
    }
  }

  async loadGoalCheck() {
    this.goals = await this.goalsService.loadGoalByType();
    if(this.goals!.goalAmount > 0) {
      this.router.navigateByUrl('/login')
      console.log('user detected')

    } else {
      console.log('no user detected')
      this.isNew = true; 
    }
  }

  
}
