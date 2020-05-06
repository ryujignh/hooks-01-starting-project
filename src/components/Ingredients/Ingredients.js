import React, { useReducer, useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from './Search';

const ingredientReducer = (currentIngredients, action) => {
    switch (action.type) {
        case 'SET':
            return action.ingredients;
        case 'ADD':
            return [...currentIngredients, action.ingredient];
        case 'DELETE':
            return currentIngredients.filter(ing => ing.id !== action.id);
        default:
            throw new Error('Should not get here!');
    }

};

const Ingredients = () => {
    const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const filteredIngredientsHandler = useCallback(filteredIngredients => {
        dispatch({type: 'SET', ingredients: filteredIngredients});
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
            dispatch({type: 'ADD', ingredient: {id: responseData.name, ...ingredient}});
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
            dispatch({type: 'DELETE', id: id});
        }).catch(error => {
            setError(error.message);
        });

    };

    const clearError = () => {
        setError(null);
        setIsLoading(false);
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
