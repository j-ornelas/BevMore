import React from 'react';
import axios from 'axios';
import helpers from './helpers.js'

export default class DrinkInfo extends React.Component{
  // let drinkURL = props.info.strDrinkThumb
  constructor(props){
    super(props);
    this.state = {
      info: props.info,
      ingredients: [],
      instructions: ""
    }
  }

  findIngredients(){
    let query = this.state.info.idDrink;
    console.log(query)
    let context = this;
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${query}`)
      .then(function (response) {
        context.setState({ingredients:helpers.formatIngredients(response.data.drinks[0])})
        context.setState({instructions:response.data.drinks[0].strInstructions})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render(){
      var ingredientsList = this.state.ingredients.map((ingredient, index) =>
      <li key={index}>{ingredient[0] + " - " + ingredient[1]}</li>
      )

    return (
      <div className="drink">
      <span><img className="drinkpicture" src={this.props.info.strDrinkThumb} /></span>
      <span className="drinkname">{this.props.info.strDrink}   <button type="button" className="btn btn-info btn-sm" onClick={this.findIngredients.bind(this)}>see recipe</button></span>
      <ul className="drinkingredients">{ingredientsList}</ul>
      <span>{this.state.instructions}</span>
      </div>
    )
  }
}
