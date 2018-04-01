import React from 'react';
import helpers from './helpers.js';

export default function Ingredients (props) {
  let ingredients = props.ingredients
  let mappedIngredients = ingredients.map((ingredient, index) =>
  <li key={index}> {helpers.reverseFormat(ingredient)} <a className="x" onClick={props.removeIng.bind(this, ingredient, props.getInfo)}>x</a> </li>
  );

  return (
    <div>
      <span className="col-md-12">
        <input onChange={props.handleChange} placeholder="add an ingredient..." value={props.ingToAdd} />
        <button onClick={props.addIng}>Add to list...</button>
        <span>Strict Search<input onClick={props.toggleStrict} type="checkbox"></input></span>
      </span>
      <span><ul>{mappedIngredients}</ul></span>
    </div>
  )
}
