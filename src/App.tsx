import { useEffect, useState } from "react";
import IngredientsList from "./components/IngredientsList";
import InputIngredient from "./components/InputIngredient";

const App = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    console.log(ingredients);
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
