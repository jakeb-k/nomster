import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipePage } from './recipe.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { GetRecipeDetailsService } from '../services/apis/get-recipe-details.service';
import { DatabaseService } from '../services/database/database.service';
import { GoalsService } from '../services/database/goals.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

describe('RecipePage', () => {
  let component: RecipePage;
  let fixture: ComponentFixture<RecipePage>;
  let getterService: GetRecipeDetailsService;
  let databaseService: DatabaseService;
  let goalsService: GoalsService;
  let modalController: ModalController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipePage],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        GetRecipeDetailsService,
        DatabaseService,
        GoalsService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  return key === 'id' ? '1' : 'loc';
                }
              }
            }
          }
        },
        ModalController
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecipePage);
    component = fixture.componentInstance;
    getterService = TestBed.inject(GetRecipeDetailsService);
    databaseService = TestBed.inject(DatabaseService);
    goalsService = TestBed.inject(GoalsService);
    modalController = TestBed.inject(ModalController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize recipe details', () => {
      const spy = spyOn(getterService, 'getRecipeDetails').and.returnValue(of({}));
      component.ngOnInit();
      expect(spy).toHaveBeenCalledWith(Number(component.route.snapshot.paramMap.get('id')));
    });
  });

  describe('getRecipeDetails', () => {
    it('should set recipe details on successful fetch', (done) => {
      const mockDetails = {
        aggregateLikes: 100,
        readyInMinutes: 30,
        servings: 4,
        sourceUrl: 'http://example.com',
        sourceName: 'Example',
        summary: 'Summary',
        image: 'http://example.com/image.jpg',
        title: 'Title',
        extendedIngredients: [],
        analyzedInstructions: [{ steps: [] }],
        nutrition: { nutrients: [] }
      };
  
      spyOn(getterService, 'getRecipeDetails').and.returnValue(of(mockDetails));
      component.getRecipeDetails();
  
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.likes).toEqual(mockDetails.aggregateLikes);
        expect(component.timeToCook).toEqual(mockDetails.readyInMinutes);
        expect(component.serving).toEqual(mockDetails.servings);
        expect(component.source.link).toEqual(mockDetails.sourceUrl);
        expect(component.source.name).toEqual(mockDetails.sourceName);
        expect(component.summary).toEqual(mockDetails.summary);
        expect(component.image).toEqual(mockDetails.image);
        expect(component.title).toEqual(mockDetails.title);
        expect(component.ingredients).toEqual(mockDetails.extendedIngredients);
        // Add more assertions as necessary to validate the setting of component properties
        done();
      });
    });
    it('should log error on failed fetch', () => {
      spyOn(getterService, 'getRecipeDetails').and.returnValue(throwError(() => new Error('Error')));
      const consoleSpy = spyOn(console, 'error');
      component.getRecipeDetails();
      expect(consoleSpy).toHaveBeenCalled();
    });
  });


  // Add more tests for other component methods like addAllToGroceries, newFav, updateGoalsByMeal, etc.

  // Example test for modalController
  describe('cancel', () => {
    it('should dismiss the modal', () => {
      spyOn(modalController, 'dismiss');
      component.cancel();
      expect(modalController.dismiss).toHaveBeenCalledWith(null, 'cancel');
    });
  });

});
