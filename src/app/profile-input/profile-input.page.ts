import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile-input',
  templateUrl: './profile-input.page.html',
  styleUrls: ['./profile-input.page.scss'],
})
export class ProfileInputPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  back(){
    this.router.navigateByUrl('/login'); 
  }
}
