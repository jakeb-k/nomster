import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CameraService } from '../services/phone/camera.service';
import { Barcode, BarcodeFormat, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, ModalController } from '@ionic/angular';
import { BarcodeFetchService } from '../services/apis/barcode-fetch.service';
import { Meal } from '../interfaces/meal';
import { GoalsService } from '../services/goals.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // Property to store the grocery list; type is any
  groceries: any; 

  // Property to store the new user's name as a string
  newUserName = ''; 

  goal:any; 
 
  user:any;
  // Retrieves the user's caloric intake from session storage and converts it to a number.
  calorieIntake: any; 

  // Calculates the ratio of calorie intake to a standard 2000 calorie diet.
  calorieRatio = Number(); 

  // Holds the writable signal from db
  currentCI:any; 

  userProfileImage: string = ''; 
  
  sessionCI = sessionStorage.getItem('calorieIntake'); 

  options = [
    ['Search Recipes', 'search','search-circle-outline'],
    ['Favourites', 'favs','heart-circle-outline'],
    ['Grocery List', 'grocery','cart'],
    ['My Goals', 'profile-input','ribbon-outline'],
    ['Update Profile', 'onboarding','cog-outline'],
  ]

  isSupported= false

  barcodes: Barcode[] = []

  code!: string; 

  productName!:string;

  scannedItem: Meal = {
    id: 0,
    title: '',
    cals: '',
    carbs: '',
    protein: '',
    fat: '',
    diet: '',
    image: ''
  }
  // Flag to show or hide the success message
  showMealMessage = Boolean(); 
 /**
  * Constructor for the component.
  * @param database - Service for interacting with the database.
  * @param router - Router service for navigation.
  * @param camera - Camera service for profile picture
  */
 constructor(private router: Router, private userService:UserService, 
  private cameraService: CameraService, private barcodeService: BarcodeFetchService,
  private goalsService: GoalsService, private modalController: ModalController) { }

 /**
  * Lifecycle hook that is called after data-bound properties of a directive are initialized.
  * Loads the grocery list from the database and assigns it to the 'groceries' property.
  */
 async ngOnInit() {
  this.user = await this.userService.loadUserByPromise(); 
  this.userProfileImage = this.user.image_data ?? ''; 
  sessionStorage.setItem('previous', 'true'); 

  BarcodeScanner.isSupported().then((result) => {
    this.isSupported = result.supported;
  });
  
 }

 activateCamera(){
  this.cameraService.takePhoto().then(photoBase64 => {
    this.userProfileImage = photoBase64;
    this.cameraService.saveImage(photoBase64, this.user.name); 
  }).catch(error => {
    console.error('Error taking photo:', error);
  });
 }
 /**
  * Navigates to a specified path.
  * @param path - The path to navigate to as a string.
  */
 nav(path: string) {
   this.router.navigateByUrl('/' + path); 
 }


 async scanCode() {
  // Check camera permission
  await BarcodeScanner.requestPermissions();

  // Check if the Google ML Kit barcode scanner is available
  await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable().then(async (data) => {
      if (data.available) {
          // Start the barcode scanner
          await this.startScanner().then(async (barcodes) => {
              this.code = barcodes[0].rawValue;
              this.barcodeFetchInfo(this.code)
              
          });
      } else {
          // Install the Google ML Kit barcode scanner
          await BarcodeScanner.installGoogleBarcodeScannerModule().then(async () => {
              await this.startScanner().then(async (barcodes) => {
                  this.code = barcodes[0].rawValue;
                  this.barcodeFetchInfo(this.code)

                  
              });
          });
      }
  });
}

  async startScanner() {
      const { barcodes } = await BarcodeScanner.scan({
          formats: [BarcodeFormat.QrCode, BarcodeFormat.Ean13, BarcodeFormat.Code128, BarcodeFormat.UpcA]
      });
      return barcodes;
  }

  async barcodeFetchInfo(id:any){
    this.productName = ''; 
    const product = this.barcodeService.getProductInfo(id);
 
      product.subscribe(data => {
        this.scannedItem.title = data['product']['product_name'];
        this.scannedItem.protein = String(data['product']['nutriments']['proteins_100g']).substring(0,4);
        this.scannedItem.cals = String(data['product']['nutriments']['energy-kcal_100g']).substring(0,5);
        this.scannedItem.carbs = String(data['product']['nutriments']['carbohydrates_100g']).substring(0,4);
        this.scannedItem.fat = String(data['product']['nutriments']['fat_100g']).substring(0,4);
        this.scannedItem.image = data['product']['image_url'];
      });


    
  }
  async updateGoalsByMeal() {
    this.cancel()
    try {
      const mealSuccess = await this.goalsService.updateGoalsByMeal(this.scannedItem); 
      if (mealSuccess) {
        this.showMealMessage = true;
        setTimeout(() => this.showMealMessage = false, 1500);
      } 
    }catch (error) {
      console.error('Error tracking by meal:', error)
    }
  }
  cancel() {
    this.modalController.dismiss() 
  }

}
