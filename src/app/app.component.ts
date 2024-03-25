import { Component } from '@angular/core';
import { DatabaseService } from './services/database/database.service';
import { GoalsService } from './services/database/goals.service';
import { SplashScreen } from '@capacitor/splash-screen';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  calorieArr: any = []; 

  constructor(private database: DatabaseService) {
    this.initApp()
  }

  async initApp(){
    await this.database.initializePlugin();
    SplashScreen.hide(); 

  }
   
}
