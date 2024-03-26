import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { UserService } from '../services/database/user.service';
import { GoalsService } from '../services/database/goals.service';
import { CameraService } from '../services/phone/camera.service';
import { BarcodeFetchService } from '../services/apis/barcode-fetch.service';
import { ModalController } from '@ionic/angular';
import { of } from 'rxjs';

class MockUserService {
  loadUserByPromise = jasmine.createSpy().and.returnValue(Promise.resolve({ name: 'John Doe', image_data: 'imageData' }));
}

class MockGoalsService {
  updateGoalsByMeal = jasmine.createSpy().and.returnValue(Promise.resolve(true));
}

class MockCameraService {
  takePhoto = jasmine.createSpy().and.returnValue(Promise.resolve('photoBase64'));
  saveImage = jasmine.createSpy();
}

class MockBarcodeFetchService {
  getProductInfo = jasmine.createSpy().and.returnValue(of({ product: { product_name: 'Apple', nutriments: { proteins_100g: 1, 'energy-kcal_100g': 100, carbohydrates_100g: 20, fat_100g: 0.5 }, image_url: 'imageUrl' } }));
}

class MockModalController {
  dismiss = jasmine.createSpy().and.returnValue(Promise.resolve());
}

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let userService: UserService;
  let goalsService: GoalsService;
  let cameraService: CameraService;
  let barcodeFetchService: BarcodeFetchService;
  let modalController: ModalController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: GoalsService, useClass: MockGoalsService },
        { provide: CameraService, useClass: MockCameraService },
        { provide: BarcodeFetchService, useClass: MockBarcodeFetchService },
        { provide: ModalController, useClass: MockModalController },
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    userService = TestBed.inject(UserService);
    goalsService = TestBed.inject(GoalsService);
    cameraService = TestBed.inject(CameraService);
    barcodeFetchService = TestBed.inject(BarcodeFetchService);
    modalController = TestBed.inject(ModalController);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should load user data', async () => {
    await component.ngOnInit();
    expect(userService.loadUserByPromise).toHaveBeenCalled();
    expect(component.userProfileImage).toBe('imageData');
  });

  it('activateCamera should set userProfileImage', async () => {
    await component.activateCamera();
    expect(cameraService.takePhoto).toHaveBeenCalled();
    expect(component.userProfileImage).toBe('photoBase64');
  });

  it('nav should navigate to the specified path', () => {
    const path = 'search';
    component.nav(path);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/' + path);
  });

  // Test other methods like scanCode, barcodeFetchInfo, updateGoalsByMeal, etc., in a similar way

});
