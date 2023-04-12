import { motion } from "framer-motion";

const ListItem = ({
  ingredient,
  toggleIngredientVisibility,
  removeIngredient,
}: {
  ingredient: Ingredient;
  toggleIngredientVisibility: Function;
  removeIngredient: Function;
}) => {
  const handleVisibility = () => {
    toggleIngredientVisibility(ingredient.id);
  };

  const handleSubmit = () => {
    removeIngredient(ingredient.id);
  };

  return (
    <motion.li
      className="relative flex h-14 w-full flex-row justify-between gap-2 overflow-hidden rounded-xl bg-bright-pink p-2"
      initial={{ opacity: 0, height: 0 }}
      animate={{ scale: [0.95, 1.01, 1], height: 56, opacity: 1 }}
      exit={{ scale: [1, 1.01, 0.8], height: 0, margin: -10, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <input
        type="checkbox"
        checked={ingredient.isVisible}
        onClick={handleVisibility}
        onChange={() => {}}
        title={
          ingredient.isVisible
            ? `Hide results from ${ingredient.name}`
            : `Show results from ${ingredient.name}`
        }
        className="h-full w-8 appearance-none rounded-l-lg border-4 border-pale-dogwood bg-bright-pink transition-colors duration-200 checked:bg-pale-dogwood hover:cursor-pointer hover:bg-pale-dogwood hover:checked:bg-bright-pink"
      />
      <span
        className={`grow p-2 transition-colors  duration-200  ${
          ingredient.isVisible
            ? "bg-pale-dogwood text-bright-pink"
            : "bg-bright-pink text-pale-dogwood line-through"
        }`}
      >
        {ingredient.name}
      </span>
      <button
        type="submit"
        title={`Remove ${ingredient.name}`}
        onClick={handleSubmit}
        className="h-full w-8 rounded-r-lg bg-pale-dogwood text-charcoal transition-colors duration-200 hover:text-bright-pink"
      >
        -
      </button>
    </motion.li>
  );
};

export default ListItem;
