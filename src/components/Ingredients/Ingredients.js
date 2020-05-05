import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';

const Ingredients = () => {
    const [userIngredients, setUserIngredients] = useState([]);

    useEffect(() => {
        fetch('https://react-hooks-update-9d1bf.firebaseio.com/ingredients.json')
            .then(response => response.json())
            .then(responseData => {
                const loadedIngredients = [];
                for (const key in responseData) {
                    loadedIngredients.push({
                        id: key,
                        title: responseData[key].title,
                        amount: responseData[key].amount,
                    });
                }
                setUserIngredients(loadedIngredients);
            });
    //    いつ呼ばれるか決めないとrenderの度に呼ばれてinifinite loopになるので[]を渡してあげる
    }, []);


    const addIngredientHandler = ingredient => {
        fetch('https://react-hooks-update-9d1bf.firebaseio.com/ingredients.json', {
            method: 'POST',
            body: JSON.stringify(ingredient),
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            return response.json();
        }).then(responseData => {
            setUserIngredients(prevState => [
                ...prevState,
                // ...ingredientと書くことでわざわざtitle, amount等を指定しなくて良くなる
                {id: responseData.name, ...ingredient}
            ]);
        });

    };

    const removeIngredientHandler = id => {
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
