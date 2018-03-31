import React from 'react';
import DrinkInfo from './DrinkInfo.jsx';

function DrinkList(props){
  const drinks = props.drinks.map((drink, index) =>
    <DrinkInfo key={index} info={drink} />
  )

  return (
    <div>{drinks}</div>
  )
}

export default DrinkList;
