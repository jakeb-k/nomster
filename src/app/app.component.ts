import { Component } from '@angular/core';
import { DatabaseService } from './services/database.service';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private database: DatabaseService) {
    this.initApp()
  }

  async initApp(){
    await this.database.initializePlugin();
    SplashScreen.hide(); 
  }
}
