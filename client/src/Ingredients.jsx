import React from 'react';
import helpers from './helpers.js';

export default function Ingredients (props) {
  let ingredients = props.ingredients
  let mappedIngredients = ingredients.map((ingredient, index) =>
  <li key={index}> {helpers.reverseFormat(ingredient)} </li>
  );
  
  return (
    <div>
      <span>
        <input onChange={props.handleChange} placeholder="add an ingredient..." value={props.ingToAdd} />
        <button onClick={props.addIng}>Add to list...</button>
      </span>
      <span><ul>{mappedIngredients}</ul></span>
    </div>
  )
}
