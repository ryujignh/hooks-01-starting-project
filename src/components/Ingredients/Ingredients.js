import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';

const Ingredients = () => {
    const [userIngredients, setUserIngredients] = useState([]);

    const addIngredientHandler = ingredient => {
        // ...ingredientと書くことでわざわざtitle, amount等を指定しなくて良くなる
        setUserIngredients(prevState => [
            ...prevState,
            {id: Math.random().toString(), ...ingredient}
        ]);
    };

    const removeIngredientHandler = id => {
        // ...ingredientと書くことでわざわざtitle, amount等を指定しなくて良くなる
        setUserIngredients(prevState => {
            return prevState.filter(ing => ing.id !== id);
        });
    };

    return (
        <div className="App">
            <IngredientForm onAddIngredient={addIngredientHandler}/>

            <section>
                <Search/>
                <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
            </section>
        </div>
    );
};

export default Ingredients;
