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
        <input className="ingredient-field input-group mb-3 col-md-5 col-sm-5 col-xs-5" onChange={props.handleChange} placeholder="add an ingredient..." value={props.ingToAdd} />
        <button className="btn btn-info col-md-5 col-sm-5 col-xs-5"onClick={props.addIng}>Add to list...</button>
        <span className="col-md-2 col-sm-2 col-xs-2">Strict Search<input onClick={props.toggleStrict} type="checkbox"></input></span>
      </span>
      <span className="display-ingredients"><br/><ul>{mappedIngredients}</ul></span>
    </div>
  )
}
