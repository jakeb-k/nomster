import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() { }

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera // or CameraSource.Photos for gallery
      });
  
      // This is your base64 string, you can set it to an img src to display it
      const imageUrl = 'data:image/jpeg;base64,' + image.base64String;
    } catch (error) {
      console.error(error);
    }
  }
  
}
