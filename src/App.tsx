import { useEffect, useState } from "react";
import IngredientsList from "./components/IngredientsList";
import InputIngredient from "./components/InputIngredient";

const fetchDrink = async (name: string) => {
  const API = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
  const response = await fetch(API + name);
  const data = await response.json();

  return data;
};

const fetchDrinksByIngredients = async (ingredients: Ingredient[]) => {
  const drinkLists = await Promise.all(
      ingredients.map(async (ingredient) => {
        const drinks = await fetchDrink(ingredient.name);
        return { ingredient, drinks };
      })
  );

  const drinkNames = drinkLists.map((list) =>
      list.drinks.drinks.map((drink: any) => drink.strDrink)
  );

  const matchedDrinkNames = drinkNames.reduce((prev, curr) =>
      prev.filter((name) => curr.includes(name))
  );

  return matchedDrinkNames;
};

const App = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [drinks, setDrinks] = useState<string[]>([]);

  useEffect(() => {
    if (ingredients.length > 0) {
      fetchDrinksByIngredients(ingredients).then((matchedDrinks) => {
        setDrinks(matchedDrinks);
      });
    }
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
          {drinks.length > 0 ? (
              <p>Matched drinks: {drinks.join(", ")}</p>
          ) : (
              <p>No matches found</p>
          )}
        </div>
      </>
  );
};

export default App;
