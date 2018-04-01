import React from 'react';
import DrinkInfo from './DrinkInfo.jsx';

function DrinkList(props){
  const drinks = props.drinks.map((drink, index) =>
    <DrinkInfo className="drink" key={index} info={drink} />
  )

  return (
    <span>{drinks}</span>
  )
}

export default DrinkList;
