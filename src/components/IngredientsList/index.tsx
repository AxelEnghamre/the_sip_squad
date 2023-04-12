import { AnimatePresence, motion } from "framer-motion";
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
    <motion.ul className="flex h-fit w-full flex-col gap-2">
      <AnimatePresence>
        {ingredients.map((ingredient) => {
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
    </motion.ul>
  );
};

export default IngredientsList;
