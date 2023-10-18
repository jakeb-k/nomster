export interface Filter {
    query:String,
    ingredients:String, 
    minProtein:String,
    minCarbs:String,
    maxCarbs:String,
    maxFat:String,
    maxCals:String,
    cuisine:String,
    diet:String[],
    type:String,
    intolerances:String[],
}
