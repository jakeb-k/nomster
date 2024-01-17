'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nomster documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-e51552455f3623d47460297ae63a736c768bf35dd5a4bd4fbe37ffe275e5f34bbd1d8d4c5ecd17fd6d1b69af5b24e404bf7bd29e0a3aab1e562e8c4494cca9a0"' : 'data-bs-target="#xs-components-links-module-AppModule-e51552455f3623d47460297ae63a736c768bf35dd5a4bd4fbe37ffe275e5f34bbd1d8d4c5ecd17fd6d1b69af5b24e404bf7bd29e0a3aab1e562e8c4494cca9a0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-e51552455f3623d47460297ae63a736c768bf35dd5a4bd4fbe37ffe275e5f34bbd1d8d4c5ecd17fd6d1b69af5b24e404bf7bd29e0a3aab1e562e8c4494cca9a0"' :
                                            'id="xs-components-links-module-AppModule-e51552455f3623d47460297ae63a736c768bf35dd5a4bd4fbe37ffe275e5f34bbd1d8d4c5ecd17fd6d1b69af5b24e404bf7bd29e0a3aab1e562e8c4494cca9a0"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FavsPageModule.html" data-type="entity-link" >FavsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-FavsPageModule-7217c4f2383eb827f37ee82dc91e972eeff28d7bf524e458afaeb5bf1f638a2ba3f24efdac91dc44896e4f58ea4b2e6f729174a10635e94b71e8d5209d583297"' : 'data-bs-target="#xs-components-links-module-FavsPageModule-7217c4f2383eb827f37ee82dc91e972eeff28d7bf524e458afaeb5bf1f638a2ba3f24efdac91dc44896e4f58ea4b2e6f729174a10635e94b71e8d5209d583297"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FavsPageModule-7217c4f2383eb827f37ee82dc91e972eeff28d7bf524e458afaeb5bf1f638a2ba3f24efdac91dc44896e4f58ea4b2e6f729174a10635e94b71e8d5209d583297"' :
                                            'id="xs-components-links-module-FavsPageModule-7217c4f2383eb827f37ee82dc91e972eeff28d7bf524e458afaeb5bf1f638a2ba3f24efdac91dc44896e4f58ea4b2e6f729174a10635e94b71e8d5209d583297"' }>
                                            <li class="link">
                                                <a href="components/FavouriteComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FavouriteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FavsPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FavsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FavsPageRoutingModule.html" data-type="entity-link" >FavsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GroceryPageModule.html" data-type="entity-link" >GroceryPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-GroceryPageModule-fa4125f322cc6865926a8d788bce096f3d07dcce0d23ade84b57837a51c7b0c56d3e71225ef9fddeccad40c7c2b08fa365b5384b730e0f12cec29fdf7f3987af"' : 'data-bs-target="#xs-components-links-module-GroceryPageModule-fa4125f322cc6865926a8d788bce096f3d07dcce0d23ade84b57837a51c7b0c56d3e71225ef9fddeccad40c7c2b08fa365b5384b730e0f12cec29fdf7f3987af"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GroceryPageModule-fa4125f322cc6865926a8d788bce096f3d07dcce0d23ade84b57837a51c7b0c56d3e71225ef9fddeccad40c7c2b08fa365b5384b730e0f12cec29fdf7f3987af"' :
                                            'id="xs-components-links-module-GroceryPageModule-fa4125f322cc6865926a8d788bce096f3d07dcce0d23ade84b57837a51c7b0c56d3e71225ef9fddeccad40c7c2b08fa365b5384b730e0f12cec29fdf7f3987af"' }>
                                            <li class="link">
                                                <a href="components/GroceryPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroceryPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GroceryPageRoutingModule.html" data-type="entity-link" >GroceryPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageModule.html" data-type="entity-link" >HomePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HomePageModule-653d6b7693f0cef1307646c768dd99dd65b641fa968e76b29aadaf5b867c58b0028f91829582c9931a216e0635b177685b9399ae5d6fb659f16f9c398fc92a0c"' : 'data-bs-target="#xs-components-links-module-HomePageModule-653d6b7693f0cef1307646c768dd99dd65b641fa968e76b29aadaf5b867c58b0028f91829582c9931a216e0635b177685b9399ae5d6fb659f16f9c398fc92a0c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomePageModule-653d6b7693f0cef1307646c768dd99dd65b641fa968e76b29aadaf5b867c58b0028f91829582c9931a216e0635b177685b9399ae5d6fb659f16f9c398fc92a0c"' :
                                            'id="xs-components-links-module-HomePageModule-653d6b7693f0cef1307646c768dd99dd65b641fa968e76b29aadaf5b867c58b0028f91829582c9931a216e0635b177685b9399ae5d6fb659f16f9c398fc92a0c"' }>
                                            <li class="link">
                                                <a href="components/HomePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomePage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MealResultComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MealResultComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageRoutingModule.html" data-type="entity-link" >HomePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageModule.html" data-type="entity-link" >LoginPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LoginPageModule-f49b0793778b9929f7b0bd5095317d992d70ba4f59ef652df432ab99a3d334a68a3d7f08f1f934f3bae5e52e1cb6843bd68eb7fa15b1bb8ff51d5239f75d7b87"' : 'data-bs-target="#xs-components-links-module-LoginPageModule-f49b0793778b9929f7b0bd5095317d992d70ba4f59ef652df432ab99a3d334a68a3d7f08f1f934f3bae5e52e1cb6843bd68eb7fa15b1bb8ff51d5239f75d7b87"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginPageModule-f49b0793778b9929f7b0bd5095317d992d70ba4f59ef652df432ab99a3d334a68a3d7f08f1f934f3bae5e52e1cb6843bd68eb7fa15b1bb8ff51d5239f75d7b87"' :
                                            'id="xs-components-links-module-LoginPageModule-f49b0793778b9929f7b0bd5095317d992d70ba4f59ef652df432ab99a3d334a68a3d7f08f1f934f3bae5e52e1cb6843bd68eb7fa15b1bb8ff51d5239f75d7b87"' }>
                                            <li class="link">
                                                <a href="components/LoginPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageRoutingModule.html" data-type="entity-link" >LoginPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NutrientsPageModule.html" data-type="entity-link" >NutrientsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-NutrientsPageModule-6b3685f5013ae76d158af72c2f0fad3d3a655415c47f7632cba40e7feab5ea8bd44e768b69743ea0675d281556499384211f666beacb3e20e78a2eded6acc993"' : 'data-bs-target="#xs-components-links-module-NutrientsPageModule-6b3685f5013ae76d158af72c2f0fad3d3a655415c47f7632cba40e7feab5ea8bd44e768b69743ea0675d281556499384211f666beacb3e20e78a2eded6acc993"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NutrientsPageModule-6b3685f5013ae76d158af72c2f0fad3d3a655415c47f7632cba40e7feab5ea8bd44e768b69743ea0675d281556499384211f666beacb3e20e78a2eded6acc993"' :
                                            'id="xs-components-links-module-NutrientsPageModule-6b3685f5013ae76d158af72c2f0fad3d3a655415c47f7632cba40e7feab5ea8bd44e768b69743ea0675d281556499384211f666beacb3e20e78a2eded6acc993"' }>
                                            <li class="link">
                                                <a href="components/NutrientsPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NutrientsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NutrientsPageRoutingModule.html" data-type="entity-link" >NutrientsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileInputPageModule.html" data-type="entity-link" >ProfileInputPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ProfileInputPageModule-e7f6c0f57aab5692830bf660698e36661adf4a60d55909f3d72e5bfc29517900e24a9d29709926f35d9c9d3073cc85e97ecefc1278a3cb6709179cbcb2b89027"' : 'data-bs-target="#xs-components-links-module-ProfileInputPageModule-e7f6c0f57aab5692830bf660698e36661adf4a60d55909f3d72e5bfc29517900e24a9d29709926f35d9c9d3073cc85e97ecefc1278a3cb6709179cbcb2b89027"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfileInputPageModule-e7f6c0f57aab5692830bf660698e36661adf4a60d55909f3d72e5bfc29517900e24a9d29709926f35d9c9d3073cc85e97ecefc1278a3cb6709179cbcb2b89027"' :
                                            'id="xs-components-links-module-ProfileInputPageModule-e7f6c0f57aab5692830bf660698e36661adf4a60d55909f3d72e5bfc29517900e24a9d29709926f35d9c9d3073cc85e97ecefc1278a3cb6709179cbcb2b89027"' }>
                                            <li class="link">
                                                <a href="components/ProfileInputPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileInputPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileInputPageRoutingModule.html" data-type="entity-link" >ProfileInputPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RecipePageModule.html" data-type="entity-link" >RecipePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RecipePageModule-eb7a8c36bec1abd7469484639737f3c519765310903e5c265f360114866a7e6cace1e28e9c003ce815133667e7665b6b0474780d087c0c701a8978065ee38d15"' : 'data-bs-target="#xs-components-links-module-RecipePageModule-eb7a8c36bec1abd7469484639737f3c519765310903e5c265f360114866a7e6cace1e28e9c003ce815133667e7665b6b0474780d087c0c701a8978065ee38d15"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RecipePageModule-eb7a8c36bec1abd7469484639737f3c519765310903e5c265f360114866a7e6cace1e28e9c003ce815133667e7665b6b0474780d087c0c701a8978065ee38d15"' :
                                            'id="xs-components-links-module-RecipePageModule-eb7a8c36bec1abd7469484639737f3c519765310903e5c265f360114866a7e6cace1e28e9c003ce815133667e7665b6b0474780d087c0c701a8978065ee38d15"' }>
                                            <li class="link">
                                                <a href="components/RecipePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecipePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RecipePageRoutingModule.html" data-type="entity-link" >RecipePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedModule-fe97de7b0f3358ea7f8e79204ac1b6fae725984b957a243b4950d644b96afe3eb223369088888e2ea5a2834deb67090cad10e33ee844042510781565a5f8e749"' : 'data-bs-target="#xs-components-links-module-SharedModule-fe97de7b0f3358ea7f8e79204ac1b6fae725984b957a243b4950d644b96afe3eb223369088888e2ea5a2834deb67090cad10e33ee844042510781565a5f8e749"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-fe97de7b0f3358ea7f8e79204ac1b6fae725984b957a243b4950d644b96afe3eb223369088888e2ea5a2834deb67090cad10e33ee844042510781565a5f8e749"' :
                                            'id="xs-components-links-module-SharedModule-fe97de7b0f3358ea7f8e79204ac1b6fae725984b957a243b4950d644b96afe3eb223369088888e2ea5a2834deb67090cad10e33ee844042510781565a5f8e749"' }>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UpdateGoalModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateGoalModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DatabaseService.html" data-type="entity-link" >DatabaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GetRecipeDetailsService.html" data-type="entity-link" >GetRecipeDetailsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GetRecipeService.html" data-type="entity-link" >GetRecipeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoalsService.html" data-type="entity-link" >GoalsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Favourite.html" data-type="entity-link" >Favourite</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Filter.html" data-type="entity-link" >Filter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Goal.html" data-type="entity-link" >Goal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Grocery.html" data-type="entity-link" >Grocery</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Meal.html" data-type="entity-link" >Meal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Nutrient.html" data-type="entity-link" >Nutrient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});