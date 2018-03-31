import React from "react";
import axios from "axios";
import helpers from "./helpers.js"

class Main extends React.Component {
  constructor(){
    super();
    this.state = {
      ingredients: ["Gin", "Orange_Juice", "Grenadine"]
    }
  }

  componentDidMount(){

  }

  getInfo(ingredientsArray){
    let query = helpers.formatQuery(this.state.ingredients);

    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/${query}`)
      .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });


  }

  render(){
    return (
      <div><button onClick={this.getInfo.bind(this, this.state.ingredients)}>test</button></div>
    )
  }
}

export default Main;
