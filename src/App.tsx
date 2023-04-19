import { useEffect, useState } from "react";
import DrinkList from "./components/DrinkList";
import IngredientsList from "./components/IngredientsList";
import InputIngredient from "./components/InputIngredient";

const fetchDrink = async (name: string) => {
  const API = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
  const response = await fetch(API + name);
  const data = await response.json();

  const drinks = data.drinks;
  const drinksWithIngredients = await Promise.all(
    drinks.map(async (drink: any) => {
      const ingredientsResponse = await fetchIngredients(drink.idDrink);
      const ingredients = ingredientsResponse.drinks[0];
      return { ...drink, ingredients };
    })
  );

  return drinksWithIngredients;
};

async function fetchIngredients(drinkId: string) {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
  );
  const data = await response.json();
  return data;
}

const App = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [drinkLists, setDrinkLists] = useState<any[]>([]);

  useEffect(() => {
    const visibleIngredients = ingredients.filter((ingredient) => {
      if (ingredient.isVisible) {
        return ingredient;
      }
    });

    let allDrinks: any = [];
    visibleIngredients.forEach((ingredient) => {
      allDrinks.push(...ingredient.drinks);
    });

    let drinks: any = [];

    allDrinks.forEach((drink: any) => {
        if (!drinks.find((d: any) => d.idDrink === drink.idDrink)) {
            drinks.push(drink);
        }
    });

    allDrinks.sort((a: any, b: any) => {
        const aIngredients = Object.keys(a.ingredients).filter((key) =>
            key.startsWith("strIngredient")
        );
        const bIngredients = Object.keys(b.ingredients).filter((key) =>
            key.startsWith("strIngredient")
        );

        let aCount = 0;
        let bCount = 0;

        aIngredients.forEach((ingredient) => {
            visibleIngredients.forEach((visibleIngredient) => {
            if (a.ingredients[ingredient] === visibleIngredient.name) {
                aCount++;
            }
            });
        });

        bIngredients.forEach((ingredient) => {
            visibleIngredients.forEach((visibleIngredient) => {
            if (b.ingredients[ingredient] === visibleIngredient.name) {
                bCount++;
            }
            });
        });

        if (aCount > bCount) {
            return -1;
        }
        if (aCount < bCount) {
            return 1;
        }
        return 0;
    });

    setDrinkLists(allDrinks);
  }, [ingredients]);

  const addIngredient = async (ingredient: string) => {
    ingredient = ingredient.charAt(0).toUpperCase() + ingredient.slice(1);
    try {
      const drinks = await fetchDrink(ingredient);
      setIngredients((prevState) => [
        ...prevState,
        { name: ingredient, isVisible: true, id: crypto.randomUUID(), drinks },
      ]);
    } catch (error) {
      alert(`${ingredient} is not an ingredient!`);
    }
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
          drinks: ingredient.drinks,
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
      <DrinkList drinkList={drinkLists} ingredients={ingredients} />
    </>
  );
};

export default App;
