import { Component } from '@angular/core';
import { DatabaseService } from './services/database.service';
import { GoalsService } from './services/goals.service';
import { SplashScreen } from '@capacitor/splash-screen';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  calorieArr: any = []; 

  constructor(private database: DatabaseService, private goalService: GoalsService) {
    this.initApp()
  }

  async initApp(){
    await this.database.initializePlugin();
    SplashScreen.hide(); 

  }
   
}
