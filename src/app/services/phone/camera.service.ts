import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DatabaseService } from '../database.service';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';


@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private databaseService: DatabaseService) { }

  private get db(): SQLiteDBConnection {
    return this.databaseService.getDatabase();
  }

  async takePhoto(): Promise<string> {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });
    return `data:image/jpeg;base64,${image.base64String}`;
  }

  public async saveImage(base64Image: string, name: string) {
    try {
      const query = 'UPDATE users SET image_data = ? WHERE name = ?';

      const result = await this.db.query(query, [base64Image, name]);
      console.log('Image saved successfully', result);
    } catch (e) {
      console.error('Error saving image to database', e);
    }
  }

}
