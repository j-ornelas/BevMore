import React from 'react';

export default function DrinkInfo (props){
  let drinkURL = props.info.strDrinkThumb
  return (
    <div className="drink">
      <span><img className="drinkpicture" src={props.info.strDrinkThumb} /></span>
      <span className="drinkname">{props.info.strDrink}</span>
      <span className="drinkingredients">drink ingredients</span>
    </div>
  )
}
