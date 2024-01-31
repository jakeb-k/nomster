import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

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
}
