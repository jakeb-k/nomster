import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavsPage } from './favs.page';
import { DatabaseService } from '../services/database/database.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Favourite } from '../interfaces/favourite';

class MockDatabaseService {
  loadFavs = jasmine.createSpy('loadFavs').and.returnValue(Promise.resolve());
  getFavs = jasmine.createSpy('getFavs').and.returnValue(() => [{ id: 1, name: 'Recipe 1', pictureLink: '', cals: '', carbs: '', fats: '', protein: '' }]);
  deleteFavById = jasmine.createSpy('deleteFavById').and.returnValue(Promise.resolve(true));
}

describe('FavsPage', () => {
  let component: FavsPage;
  let fixture: ComponentFixture<FavsPage>;
  let databaseService: DatabaseService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavsPage],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        { provide: DatabaseService, useClass: MockDatabaseService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavsPage);
    component = fixture.componentInstance;
    databaseService = TestBed.inject(DatabaseService);
    router = TestBed.get(Router);

    spyOn(router, 'navigateByUrl');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load favourites on init', () => {
    component.ngOnInit();
    expect(databaseService.loadFavs).toHaveBeenCalled();
    expect(databaseService.getFavs).toHaveBeenCalled();
  });

  it('should delete a favourite and refresh list', () => {
    const fav: Favourite = { id: 1, name: 'Recipe 1', pictureLink: '', cals: '', carbs: '', fats: '', protein: '' };
    component.deleteFav(fav);
    expect(databaseService.deleteFavById).toHaveBeenCalledWith(fav.id.toString());
  });

  it('should navigate to recipe details page', () => {
    const id = 1;
    component.recipeNav(id);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/recipe/1/favs', {replaceUrl: true});
  });

  it('should navigate to nutrient details page', () => {
    const id = 1;
    component.nutrientNav(id);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/nutrients/1/favs', {replaceUrl: true});
  });

  it('should navigate to home', () => {
    component.navHome();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  // Additional tests can be added for any other methods and scenarios as needed
});
