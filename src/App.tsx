import { useEffect, useState } from "react";
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
      let unique = true;
      drinks.forEach((sortedDrink: any) => {
        if (drink.idDrink === sortedDrink.idDrink) {
          unique = false;
        }
      });

      if (unique) {
        drinks.push(drink);
      }
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

      <ul className="flex flex-row flex-wrap items-center justify-center gap-6">
        {drinkLists.map((drink) => {
          return (
            <li
              className=" h-fit w-fit rounded-xl bg-celestial-blue p-4"
              key={crypto.randomUUID()}
            >
              <h3 className="text-xl text-bright-pink">{drink.strDrink}</h3>
              <ul className="flex flex-col gap-2">
                {Object.keys(drink.ingredients).map((key) => {
                  if (
                    key.startsWith("strIngredient") &&
                    drink.ingredients[key]
                  ) {
                    return (
                      <li
                        key={crypto.randomUUID()}
                        className={
                          ingredients.find((ingredient) => {
                            if (
                              ingredient.name.toLowerCase() ===
                              drink.ingredients[key].toLowerCase()
                            ) {
                              if (ingredient.isVisible) {
                                return 1;
                              }
                              return 2;
                            }
                          })
                            ? "text-green-500"
                            : "text-black"
                        }
                      >
                        {drink.ingredients[key]} -{" "}
                        {
                          drink.ingredients[
                            key.replace("strIngredient", "strMeasure")
                          ]
                        }
                      </li>
                    );
                  }
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default App;
