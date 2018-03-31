const formatQuery = (strArray) => {
  //I:array of strings
  //O: single string in query format
    //ex: ["Vodka", "Orange_Juice"] === "i=Vodka&i=Orange_Juice&"
  //E: must work with empty strings (give random) and single entry strings
  let queryString = "filter.php?";
  if (!strArray.length){
    return "random.php";
  }
  for (var i = 0; i < strArray.length; i++){
    queryString += `i=${strArray[i]}&`;
  }
  return queryString;
};

module.exports.formatQuery = formatQuery;
