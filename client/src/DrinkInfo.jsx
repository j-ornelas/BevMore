import React from 'react';
import axios from 'axios';
import helpers from './helpers.js'

export default class DrinkInfo extends React.Component{
  // let drinkURL = props.info.strDrinkThumb
  constructor(props){
    super(props);
    this.state = {
      info: props.info,
      drinkIngredients: [],
      instructions: ""
    }
  }

  findIngredients(){
    let query = this.state.info.idDrink;
    console.log(query)
    let context = this;
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${query}`)
      .then(function (response) {
        context.setState({drinkIngredients:helpers.formatIngredients(response.data.drinks[0])})
        context.setState({instructions:response.data.drinks[0].strInstructions})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render(){
    let ingredientsList = this.state.drinkIngredients.map((ingredient) =>
      <li>{ingredient[0] + " - " + ingredient[1]}</li>
    )

    return (
      <div className="drink">
      <span><img className="drinkpicture" src={this.state.info.strDrinkThumb} /></span>
      <span className="drinkname">{this.state.info.strDrink} <button onClick={this.findIngredients.bind(this)}>more info</button></span>
      <ul className="drinkingredients">{ingredientsList}</ul>
      <span>{this.state.instructions}</span>
      </div>
    )
  }
}
