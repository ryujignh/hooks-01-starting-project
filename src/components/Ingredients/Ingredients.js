import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from './Search';

const Ingredients = () => {
    const [userIngredients, setUserIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const filteredIngredientsHandler = useCallback(filteredIngredients => {
        setUserIngredients(filteredIngredients);
    }, []);


    const addIngredientHandler = ingredient => {
        setIsLoading(true);
        fetch('https://react-hooks-update-9d1bf.firebaseio.com/ingredients.json', {
            method: 'POST',
            body: JSON.stringify(ingredient),
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            setIsLoading(false);
            return response.json();
        }).then(responseData => {
            setUserIngredients(prevState => [
                ...prevState,
                // ...ingredientと書くことでわざわざtitle, amount等を指定しなくて良くなる
                {id: responseData.name, ...ingredient}
            ]);
        }).catch(error => {
            setError(error.message);
        });

    };

    const removeIngredientHandler = id => {
        setIsLoading(true);
        fetch(`https://react-hooks-update-9d1bf.firebaseio.com/ingredients/${id}.json`, {
            method: 'DELETE',
        }).then(response => {
            setIsLoading(false);
            setUserIngredients(prevState => {
                return prevState.filter(ing => ing.id !== id);
            });
        }).catch(error => {
            setError(error.message);
        });

    };

    const clearError = () => {
        setError(null);
        setIsLoading(false)
    };

    return (
        <div className="App">
            {error && <ErrorModal onClose={clearError}>{error.message}</ErrorModal>}
            <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading}/>

            <section>
                <Search onLoadIngredients={filteredIngredientsHandler}/>
                <IngredientList loading={isLoading} ingredients={userIngredients}
                                onRemoveItem={removeIngredientHandler}/>
            </section>
        </div>
    );
};

export default Ingredients;
