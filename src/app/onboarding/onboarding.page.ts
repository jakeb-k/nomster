import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  dateInput!: string; 

  icons = [
    { label: 'Loss', value: '-1', name: 'caret-up-outline' },
    { label: 'Maintain', value: '0', name: 'checkmark-outline' },
    { label: 'Gain', value: '1', name: 'caret-down-outline' },
  ];

  selectedIcon: string | null = null;

  constructor() { }

  ngOnInit() {
  }

  selectIcon(value: string) {
    this.selectedIcon = value;
  }

  formatDate(){
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{2}$/;

    // Check if the current input matches the format
    if (!this.dateInput.match(dateRegex)) {
      // If not, implement logic to reformat or notify the user
      console.log('Invalid date format. Please use MM/DD/YY.');
      // You can also implement logic to auto-correct the input here
    }
  }
}
