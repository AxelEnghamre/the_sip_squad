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
    <motion.ul
      className="flex h-fit w-full flex-col gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="popLayout">
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
