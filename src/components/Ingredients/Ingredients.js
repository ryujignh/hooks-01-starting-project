import React, { useReducer, useEffect, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from './Search';
import useHttp from "../../hooks/http";

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
    const {isLoading, error, data, sendRequest} = useHttp();

    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState('');

    const filteredIngredientsHandler = useCallback(filteredIngredients => {
        dispatch({type: 'SET', ingredients: filteredIngredients});
    }, []);


    const addIngredientHandler = useCallback(ingredientId => {
        // sendRequest(`https://react-hooks-update-9d1bf.firebaseio.com/ingredients/${ingredientId}.json`, 'DELETE')
    }, [sendRequest]);

    const removeIngredientHandler = useCallback(id => {
        // dispatchHttp({type: 'SEND'});
        sendRequest(`https://react-hooks-update-9d1bf.firebaseio.com/ingredients/${id}.json`, 'DELETE')
    }, [sendRequest]);

    const clearError = useCallback(() => {
        // dispatchHttp({type: 'CLEAR'});
    }, []);

    const ingredientList = useMemo(() => {
        return (
            <IngredientList loading={isLoading} ingredients={userIngredients}
                            onRemoveItem={removeIngredientHandler}/>
        );
    }, [userIngredients, removeIngredientHandler]);

    return (
        <div className="App">
            {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
            <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading}/>

            <section>
                <Search onLoadIngredients={filteredIngredientsHandler}/>
                {ingredientList}
            </section>
        </div>
    );
};

export default Ingredients;
