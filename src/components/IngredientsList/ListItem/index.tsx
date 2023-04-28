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
      className="relative flex h-14 w-full flex-row justify-between gap-2 overflow-hidden rounded-xl bg-zinc-100 p-2 shadow-md"
      initial={{ opacity: 0 }}
      animate={{ scale: [0.95, 1.04, 1], opacity: 1 }}
      exit={{ scale: [1, 1.03, 0.8], height: 0, margin: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        onClick={handleVisibility}
        className="flex h-full w-16 flex-row rounded-lg bg-zinc-200 hover:cursor-pointer"
      >
        <input
          type="checkbox"
          checked={ingredient.isVisible}
          onChange={() => {}}
          title={
            ingredient.isVisible
              ? `Hide results from ${ingredient.name}`
              : `Show results from ${ingredient.name}`
          }
          className="h-full w-8 appearance-none rounded-lg border-4 bg-zinc-800 transition duration-200 checked:translate-x-8 checked:bg-teal-300 hover:cursor-pointer hover:bg-zinc-700"
        />
      </div>
      <span
        className={`grow p-2 transition-colors  duration-200  ${
          ingredient.isVisible
            ? "text-bright-pink"
            : "text-pale-dogwood line-through"
        }`}
      >
        {ingredient.name}
      </span>
      <button
        type="submit"
        title={`Remove ${ingredient.name}`}
        onClick={handleSubmit}
        className="hover:text-bold h-full w-8 rounded-lg bg-zinc-800 text-slate-100 transition-colors duration-200 hover:bg-zinc-700 hover:text-teal-300"
      >
        -
      </button>
    </motion.li>
  );
};

export default ListItem;
