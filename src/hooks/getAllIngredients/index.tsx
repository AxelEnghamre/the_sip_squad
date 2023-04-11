import {useState, useEffect} from "react";
const POST_API = "www.thecocktaildb.com/api/json/v1/1/search.php?s="

const getAllIngredients = (drink : string[]) => { // custom hook to get the ingredients from the drinks
    const [showIngredients, setShowIngredients] = useState([""]); // state to show the ingredients
    let ingredients: { strIngredient1: string }[] = []; // array to store the ingredients
    useEffect( () => { // useEffect to fetch the data
        setShowIngredients(["lodaing..."]); // set the state to loading while fetching the data
        const fetchAPI = async () => { // async function to fetch the data
            const response = await fetch(POST_API + drink.join(","));
            const data = await response.json();
            ingredients = data.ingredients; // store the ingredients in the ingredients array
            setShowIngredients([""]); // set the state to empty
            ingredients.map((ingredient, index) => { // map the ingredients array to set the state
                setShowIngredients((oldArray) => [...oldArray, ingredient.strIngredient1]); // set the state to the ingredients array
            });
        }
        fetchAPI(); // call the async function

        }, [drink] // empty array to call the useEffect only once
    );

    return showIngredients; // return the state

}

export default getAllIngredients;