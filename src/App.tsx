import { useEffect, useState } from "react";
import IngredientsList from "./components/IngredientsList";
import InputIngredient from "./components/InputIngredient";
import UseResultOfIngredient from "./hooks/useResultOfIngredient";

const App = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [drinks, setDrinks] = useState<string[]>([]);
  const API = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
  useEffect(() => {
    //get name of ingredients
    let ingredientsName: string[] = [];
    ingredients.map((ingredient) => {
        if (ingredient.isVisible) {
            ingredientsName.push(ingredient.name);
        }
    });
    console.log(ingredients);
    console.log(ingredientsName);
    ingredientsName.map((ingredientName) => {


      const fetchAPI = async () => { // async function to fetch the data
        const response = await fetch(API + ingredientName);
        const data = await response.json();
        console.log('data');
        console.log(data.drinks);
        setDrinks((oldArray) => [...oldArray, data.drinks]);
        }
        fetchAPI();
      setDrinks([]);
      console.log('state');
      console.log(drinks);
    });
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
    </>
  );
};

export default App;
