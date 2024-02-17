# Nomster
This is a open-source project built with the Angular Framework and using the Ionic package to port for mobile
## Description
A recipe book / calorie tracker app built with Angular Ionic. Uses spoonacular API's for data retrieval.
### Instructions
1. Firstly you need to make an account with spoonacular to get access to their API keys, you can do this at [Spoonacular](https://spoonacular.com/food-api/docs)
2. You then need to make sure `npm` is installed on your system. If it is not installed visit the node package manager website for more info [NPM](https://www.npmjs.com/)
3. Once this is installed, you can install the Angular framework with `npm install -g @angular/cli`
4. After you have installed both Angular and Ionic, next you need to create an environment folder within the /src folder
5. Once this folder is created you need to add to files called, environment.prod.ts and environment.ts.
6. In these files all you need to do is add the spoonacular API key that you should get from signing up. Here is an example `export const environment = {
    production: true,
    apiKey: "YOUR_KEY_HERE"
  };
  ` and you just swap over the production bool for each file.
7. You can then install the Ionic Package with `npm install -g @ionic/cli`
8. Once you have installed both packages you need to run `ionic cap build android` (or ios) and you can then access the application within Android Studio or xCode depending on what platform you use. 

And congrats you are now running Nomster. I'd love to see your proposed changes for this project and truly believe as a community we can not only learn, but create something truly special. I am always available at jk_web_dev@outlook.com and would love to hear from you regarding this project. 

### Let's make something great, 
### Jakeb. 
