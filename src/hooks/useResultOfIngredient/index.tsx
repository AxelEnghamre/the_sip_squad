import {useState, useEffect} from "react";
const POST_API = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="

const useResultOfIngredient = (ingredient : string[]) => { // custom hook to get the result of the ingredient
    const [showDrinks, setShowDrinks] = useState([""]); // state to show the drinks
    let drinks: { strDrink: string }[] = []; // array to store the drinks
    useEffect( () => { // useEffect to fetch the data
        setShowDrinks(["lodaing..."]); // set the state to loading while fetching the data
        const fetchAPI = async () => { // async function to fetch the data
            const response = await fetch(POST_API + ingredient);
            const data = await response.json();
            drinks = data.drinks; // store the drinks in the drinks array
            setShowDrinks([""]); // set the state to empty
            drinks.map((drink, index) => { // map the drinks array to set the state
                setShowDrinks((oldArray : string[]) => [...oldArray, drink.strDrink]); // set the state to the drinks array
            });
        }
        fetchAPI(); // call the async function

        }, [] // empty array to call the useEffect only once
    );

    return showDrinks; // return the state
}

export default useResultOfIngredient;