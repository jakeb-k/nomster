import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  dateInput!: string; 

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

  selectedIcon: string | null = null;
  selectedGenderIcon: string | null = null; 

  constructor() { }

  ngOnInit() {
  }

  selectIcon(value: string) {
    this.selectedIcon = value;
  }
  selectIcon2(value: string) {
    this.selectedGenderIcon = value;
  }

}
