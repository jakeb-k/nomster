//represents a favourite meal with the basic nutrition info
export interface Favourite {
    //unique identifier, defined as number in sql db
    id:number;
    //name of the favourite meal, represented as a string
    name:String;
    //link to a picture of the favourite meal
    pictureLink:String;
    //total calories for the favourite meal, represented as string 
    cals: String,
    //total carbohydrate content for the favourite meal, represented as string 
    carbs: String,
    //total fat content for the favourite meal, represented as string 
    fats: String,
    //total protein content for the favourite meal, represented as string 
    protein: String
}
