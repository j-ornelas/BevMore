import React from "react";
import axios from "axios";
import helpers from "./helpers.js";
import NavBar from "./Navbar.jsx";
import DrinkList from "./DrinkList.jsx";

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ingredients: ["Gin", "Orange_Juice", "Grenadine"],
      drinks: []
    }

  }

  componentDidMount(){

  }

  getInfo(ingredientsArray){
    let query = helpers.formatQuery(this.state.ingredients);
    let context = this;

    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/${query}`)
      .then(function (response) {
        context.setState({drinks:response.data.drinks})
    })
    .catch(function (error) {
      console.log(error);
    });


  }

  render(){
    return (
      <div>
      <NavBar />
      <DrinkList drinks={this.state.drinks}/>
      <button onClick={this.getInfo.bind(this, this.state.ingredients)}>test</button>
      </div>
    )
  }
}

export default Main;
