import {JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useState, useEffect} from "react";
const POST_API = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="

const useResultOfIngredient = (ingredient : string) => {
    const [showDrinks, setShowDrinks] = useState([""]);
    let drinks: { strDrink: string }[] = [];
    useEffect( () => {
        setShowDrinks(["lodaing"]);
        const fetchAPI = async () => {
            const response = await fetch(POST_API + ingredient);
            const data = await response.json();
            drinks = data.drinks;
            setShowDrinks([""]);
            drinks.map((drink, index) => {
                setShowDrinks((oldArray) => [...oldArray, drink.strDrink]);
            });
        }
        fetchAPI();

        }, []
    );

    return showDrinks;
}

export default useResultOfIngredient;