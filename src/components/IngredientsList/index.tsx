import { AnimatePresence } from "framer-motion";
import ListItem from "./ListItem";

const IngredientsList = ({
  ingredients,
  toggleIngredientVisibility,
  removeIngredient,
}: {
  ingredients: Ingredient[];
  toggleIngredientVisibility: Function;
  removeIngredient: Function;
}) => {
  return (
    <ul className="flex h-fit w-full flex-col gap-6">
      <AnimatePresence>
        {ingredients.map((ingredient, index) => {
          return (
            <ListItem
              key={ingredient.id}
              ingredient={ingredient}
              toggleIngredientVisibility={toggleIngredientVisibility}
              removeIngredient={removeIngredient}
            />
          );
        })}
      </AnimatePresence>
    </ul>
  );
};

export default IngredientsList;
