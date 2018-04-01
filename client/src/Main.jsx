import React from "react";
import axios from "axios";
import helpers from "./helpers.js";
import NavBar from "./Navbar.jsx";
import Ingredients from "./Ingredients.jsx";
import DrinkList from "./DrinkList.jsx";

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      query: "",
      ingToAdd: "",
      strict: false,
      ingredients: [],
      allDrinks: [],
      drinks: []
    }

  }

  toggleStrict(){
    this.setState({strict:!this.state.strict})
    if (!this.state.strict){
      this.strictFilter()
    } else {
      this.setState({drinks:this.state.allDrinks})
    }
  }

  strictFilter(){
    let allDrinks = this.state.allDrinks;
    let ingredients = this.state.ingredients;
    let filteredDrinks = [];
    for (var i = 0; i < allDrinks.length; i++){
      if (helpers.passesStrict(allDrinks[i], ingredients)){
        filteredDrinks.push(allDrinks[i])
      }
    }
    this.setState({drinks:[]})
    this.setState({drinks:filteredDrinks})
  }


  componentDidMount(){
    // this.getInfo(this.state.ingredients)
  }

  getInfo(ingredientsArray){
    let query = helpers.formatQuery(this.state.ingredients);
    console.log(query)
    let context = this;
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/${query}`)
      .then(function (response) {
        context.setState({allDrinks:response.data.drinks})
        if (context.state.strict){
          context.strictFilter()
        } else{
          context.setState({drinks:[]})
          context.setState({drinks:response.data.drinks})
        }
        return context.state.allDrinks
    })
    .then(function(next){
      for (var i = 0; i < next.length; i++){
        context.getIngredients(next[i])
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getIngredients(drink){
    let context = this;
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`)
      .then(function (response) {
        drink.ingredients = helpers.formatIngredients(response.data.drinks[0])
        drink.instructions = response.data.drinks[0].strInstructions
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  removeIng(ingredient, callback){
    let currIngredients = this.state.ingredients;
    let newIngredients = [];
    for (let i = 0; i < currIngredients.length; i++){
      if (currIngredients[i] !== ingredient){
        newIngredients.push(currIngredients[i])
      }
    }
    this.setState({ingredients:newIngredients})
    callback(newIngredients)

  }

  addIng(){
    let currentIng = this.state.ingredients
    currentIng.push(helpers.formatIngredient(this.state.ingToAdd))
    this.setState({ingredients:currentIng});
    this.setState({ingToAdd:""})
    this.getInfo(this.state.ingredients)
  }

  handleChange(event){
    this.setState({ingToAdd: event.target.value})
  }


  render(){
    return (
      <div>
        <NavBar />
        <Ingredients
          ingredients={this.state.ingredients}
          toggleStrict={this.toggleStrict.bind(this)}
          ingToAdd={this.state.ingToAdd}
          addIng={this.addIng.bind(this)}
          getInfo={this.getInfo.bind(this)}
          removeIng={this.removeIng.bind(this)}
          handleChange={this.handleChange.bind(this)}
        />
        <DrinkList drinks={this.state.drinks}/>
      </div>
    )
  }
}

export default Main;
