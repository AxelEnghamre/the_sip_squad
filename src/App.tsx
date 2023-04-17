import { useEffect, useState } from "react";
import IngredientsList from "./components/IngredientsList";
import InputIngredient from "./components/InputIngredient";

const fetchDrink = async (name: string) => {
    const API = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
    const response = await fetch(API + name);
    const data = await response.json();

    return data;
};

async function fetchIngredients(drinkId: string) {
    const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
    );
    const data = await response.json();
    return data;
}

const fetchDrinksByIngredients = async (ingredients: Ingredient[]) => {
    const drinkLists = await Promise.all(
        ingredients.map(async (ingredient) => {
            const drinksResponse = await fetchDrink(ingredient.name);
            const drinks = drinksResponse.drinks;
            const drinksWithIngredients = await Promise.all(
                drinks.map(async (drink: any) => {
                    const ingredientsResponse = await fetchIngredients(drink.idDrink);
                    const ingredients = ingredientsResponse.drinks[0];
                    return { ...drink, ingredients };
                })
            );
            return { ingredient, drinks: drinksWithIngredients };
        })
    );

    const drinkCounts: { [key: string]: number } = {};
    drinkLists.forEach((list) => {
        list.drinks.forEach((drink: any) => {
            if (!drinkCounts[drink.strDrink]) {
                drinkCounts[drink.strDrink] = 0;
            }
            drinkCounts[drink.strDrink]++;
        });
    });

    const matchedDrinkNames = Object.keys(drinkCounts).sort((a, b) => {
        return drinkCounts[b] - drinkCounts[a];
    });

    //log the drinks and ingredients
    drinkLists.forEach((list) => {
        console.log(list.ingredient.name);
        list.drinks.forEach((drink: any) => {
            console.log(drink.strDrink);
            console.log(drink.ingredients);
        });
    });

    return { matchedDrinkNames, drinkLists };
};


const App = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [drinks, setDrinks] = useState<string[]>([]);

  useEffect(() => {
    const fetchDrinks = async () => {
        const { matchedDrinkNames } = await fetchDrinksByIngredients(ingredients);
        setDrinks(matchedDrinkNames);
    };

    fetchDrinks();
    }, [ingredients]);


  const addIngredient = (ingredient: string) => {
    setIngredients((prevState) => [
      ...prevState,
      { name: ingredient, isVisible: true, id: crypto.randomUUID() },
    ]);
  };

  const toggleIngredientVisibility = (id: string) => {
    const foundIndexKey = ingredients.findIndex(
        (ingredient) => ingredient.id === id
    );

    const updatedIngredients = ingredients.map((ingredient, index) => {
      if (index === foundIndexKey) {
        return {
          name: ingredient.name,
          id: ingredient.id,
          isVisible: !ingredient.isVisible,
        };
      }

      return ingredient;
    });

    setIngredients(updatedIngredients);
  };

  const removeIngredient = (id: string) => {
    const foundIndexKey = ingredients.findIndex(
        (ingredient) => ingredient.id === id
    );

    const temp = [...ingredients];

    const updatedIngredients = temp.filter((ingredient, index) => {
      if (index === foundIndexKey) {
        return;
      }
      return ingredient;
    });

    setIngredients(updatedIngredients);
  };

  return (
      <>
        <IngredientsList
            ingredients={ingredients}
            toggleIngredientVisibility={toggleIngredientVisibility}
            removeIngredient={removeIngredient}
        />
        <InputIngredient onSubmit={addIngredient} />

        <div>
            {drinks.map((drink) => (
                <div key={drink}>{drink}</div>
            ))}
        </div>
      </>
  );
};

export default App;
