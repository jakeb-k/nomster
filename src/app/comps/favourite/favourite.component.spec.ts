import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavouriteComponent } from './favourite.component';
import { DatabaseService } from 'src/app/services/database/database.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Favourite } from 'src/app/interfaces/favourite';

class MockDatabaseService {
  deleteFavById = jasmine.createSpy('deleteFavById').and.returnValue(Promise.resolve(true));
}

describe('FavouriteComponent', () => {
  let component: FavouriteComponent;
  let fixture: ComponentFixture<FavouriteComponent>;
  let databaseService: MockDatabaseService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavouriteComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: DatabaseService, useClass: MockDatabaseService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavouriteComponent);
    component = fixture.componentInstance;
    databaseService = TestBed.inject(DatabaseService) as unknown as MockDatabaseService;
    router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteFav when deleteFav is called', async () => {
    const fav: Favourite = { id: 1, name: 'Test Fav', pictureLink: 'link', cals: '', carbs: '', fats: '', protein: '' };
    await component.deleteFav(fav);
    expect(databaseService.deleteFavById).toHaveBeenCalledWith(fav.id.toString());
  });

  it('should navigate to the recipe detail page when recipeNav is called', () => {
    const id = 1;
    component.recipeNav(id);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/recipe/1/favs', { replaceUrl: true });
  });
});