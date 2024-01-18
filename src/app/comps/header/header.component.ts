import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  /**
   * Initializes the component with the Router.
   * @param router - Router for navigation.
   */
  constructor(private router: Router) { }

  ngOnInit() {}

  /**
   * Navigates to a specified path.
   * Uses the path parameter to navigate to the corresponding route.
   * @param path - The path to navigate to as a string.
   */
  nav(path:String) {
    this.router.navigateByUrl('/'+path);  
  }

}
