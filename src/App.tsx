import { useEffect, useState } from "react";
import IngredientsList from "./components/IngredientsList";
import InputIngredient from "./components/InputIngredient";


const fetchDrink = async (name: string) => {
  const API = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
  const response = await fetch(API + name);
  const data = await response.json();

  return data;
};

const App = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [drinks, setDrinks] = useState<{
    ingredient: Ingredient;
    drinks: any;
  }[]>([]);
  const [result, setResult] = useState<any[]>([]);
  useEffect(() => {

    if(ingredients.length > 0) {
      const lastIngredient = ingredients[ingredients.length - 1];
      if (drinks.length > 0) {
        const lastDrinks = drinks[drinks.length - 1];
        if (lastIngredient != lastDrinks.ingredient) {
          fetchDrink(lastIngredient.name).then((drinks) => {
            setDrinks((oldDrinks) => [...oldDrinks, {ingredient: lastIngredient, drinks}]);
          });
        }
      }
      else {
        fetchDrink(ingredients[0].name).then((drinks) => {
          setDrinks((oldDrinks) => [...oldDrinks, {ingredient: ingredients[0], drinks}]);
        });
      }
    }
  }, [ingredients]);

  useEffect(() => {
    console.log(drinks);
  }, [drinks]);

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
    </>
  );
};

export default App;
