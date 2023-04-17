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

    drinkLists.forEach((list) => {
        list.drinks.sort((a: any, b: any) => {
            return matchedDrinkNames.indexOf(a.strDrink) - matchedDrinkNames.indexOf(b.strDrink);
        });
    });



    return { matchedDrinkNames, drinkLists };
};


const App = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [drinks, setDrinks] = useState<string[]>([]);
    const [drinkLists, setDrinkLists] = useState<any[]>([]);

    useEffect(() => {
        const fetchDrinkLists = async () => {
            const { matchedDrinkNames, drinkLists } = await fetchDrinksByIngredients(filteredIngredients);
            setDrinks(matchedDrinkNames);
            setDrinkLists(drinkLists);
        };

        const filteredIngredients = ingredients.filter((ingredient) => ingredient.isVisible);
        if (filteredIngredients.length === 0) {
            setDrinks([]);
            setDrinkLists([]);
            return;
        }

        fetchDrinkLists();
    }, [ingredients]);

    const addIngredient = (ingredient: string) => {
        ingredient = ingredient.charAt(0).toUpperCase() + ingredient.slice(1);
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
console.log(drinkLists);
  return (
      <>
        <IngredientsList
            ingredients={ingredients}
            toggleIngredientVisibility={toggleIngredientVisibility}
            removeIngredient={removeIngredient}
        />
        <InputIngredient onSubmit={addIngredient} />
        <div>
            {
                drinkLists.map((drinkList) => {
                    return (
                        <div>
                            <ul>
                                {
                                    drinkList.drinks.map((drink: any) => {
                                        return (
                                            <li>
                                                <h2 className={"text-3xl"}>{drink.strDrink}</h2>
                                                <ul className={" list-disc list-inside"}>
                                                    {
                                                        Object.keys(drink.ingredients).map((key) => {
                                                            if (key.startsWith('strIngredient') && drink.ingredients[key]) {
                                                                return (
                                                                    <li className={ingredients.find((ingredient) => ingredient.name === drink.ingredients[key]) ? 'text-green-500' : 'text-red-500'}>
                                                                        {drink.ingredients[key]}
                                                                    </li>
                                                                );
                                                            }
                                                        })
                                                    }
                                                </ul>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    );
                })
            }
        </div>
      </>
  );
};

export default App;
