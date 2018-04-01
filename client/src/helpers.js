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
  let formatted = [];
  for (var i = 0; i < 10; i++){
    if (obj[`strIngredient${i}`]){
      formatted.push([obj[
        `strIngredient${i}`],
        obj[`strMeasure${i}`]]);
    }
  }
  return formatted;
};

module.exports.formatQuery = formatQuery;
module.exports.formatIngredient = formatIngredient;
module.exports.reverseFormat = reverseFormat;
module.exports.formatIngredients = formatIngredients;
