const formatQuery = (strArray) => {
  //ex: ["Vodka", "Orange_Juice"] === "i=Vodka&i=Orange_Juice&"
  let queryString = "filter.php?";
  if (!strArray.length){
    return "random.php";
  }
  for (var i = 0; i < strArray.length; i++){
    queryString += `i=${strArray[i]}&`;
  }
  return queryString;
};

const formatIngredient = (str) => {
  //ex: '"oRaNGe jUiCe" -> "Orange_Juice"'
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
  let words = str.split(" ");
  let final = [];
  for (var i = 0; i < words.length; i++){
    final.push(toTitleCase(words[i]));
  }
  return final.join("_");
};

const reverseFormat = (str) => {
  //ex: 'Orange_Juice' -> 'Orange Juice'
  return str.split("_").join(" ")
};


const formatIngredients = (obj) => {
  //the api's formatting is trash. we fix it here.
  let formatted = [];
  for (var i = 0; i < 10; i++){
    if (obj[`strIngredient${i}`]){
      formatted.push([
        obj[`strIngredient${i}`],
        obj[`strMeasure${i}`]
      ]);
    }
  }
  return formatted;
};

const passesStrict = function(drink, ingredients){
  let toCheck = [];
  let currentIngs = [];
  let pass = true;
  //lets make an array of ingredients to check
  for (let i = 0; i < drink.ingredients.length; i++){
    toCheck.push(drink.ingredients[i][0].toLowerCase())
  }
  //lets make an array of human-readable current ingredients
  for (let i = 0; i < ingredients.length; i++){
    currentIngs.push(reverseFormat(ingredients[i]).toLowerCase())
  }
  // [guiness stout, root beer, vodka] - [beer, root beer]
  for (let i = 0; i < toCheck.length; i++){
    if (currentIngs.includes(toCheck[i])){
      //cool
    } else {
      pass = false;
    }
  }
  return pass;
}

module.exports.formatQuery = formatQuery;
module.exports.formatIngredient = formatIngredient;
module.exports.reverseFormat = reverseFormat;
module.exports.formatIngredients = formatIngredients;
module.exports.passesStrict = passesStrict;
