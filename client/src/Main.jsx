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
      ingredients: [],
      drinks: []
    }

  }

  componentDidMount(){

  }

  getInfo(ingredientsArray){
    let query = helpers.formatQuery(this.state.ingredients);
    console.log(query)
    let context = this;
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/${query}`)
      .then(function (response) {
        context.setState({drinks:response.data.drinks})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  addIng(str){

  }

  addIng(){
    console.log(this.state.ingToAdd)
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
          ingToAdd={this.state.ingToAdd}
          addIng={this.addIng.bind(this)}
          handleChange={this.handleChange.bind(this)}
        />
        <DrinkList drinks={this.state.drinks}/>
      </div>
    )
  }
}

export default Main;
