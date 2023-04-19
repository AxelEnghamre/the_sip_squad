import { motion } from "framer-motion";
import _, {find, map} from "lodash";
const Drink = ({
  drink,
  ingredients,
}: {
  drink: any;
  ingredients: Ingredient[];
}) => {
  return (
    <motion.li
      className=" flex flex-row flex-wrap items-center gap-6 w-1/2 bg-zinc-100 rounded-xl p-4 shadow-lg"
      key={crypto.randomUUID()}
      whileDrag={{ scale: 1.1 }}
        drag
      whileHover={{ scale: 1.1, transition: { duration: 0.2 }, cursor: "grab", }}
      whileTap={{ scale: 0.9, transition: { duration: 0.2 }, cursor: "grabbing", }}
      whileFocus={{ scale: 1.1, transition: { duration: 0.2 }, cursor: "grab", }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <img
          src={drink.strDrinkThumb}
          alt={drink.strDrink}
          className="w-64 h-full rounded-xl shadow-lg object-cover object-center"
          draggable="false"
      />
      <div className="flex flex-col gap-2">
      <h3 className="text-3xl text-zinc-950 font-medium">{drink.strDrink}</h3>

      <ul className="flex flex-col gap-2">
        {map(drink.ingredients, (value, key) => {
          if (key.startsWith("strIngredient") && value) {
            const hasIngredient = find(ingredients, (ingredient) => {
              return (
                  ingredient.name.toLowerCase() === value.toLowerCase() &&
                  (ingredient.isVisible ? 1 : 2)
              );
            });
            let color = "text-zinc-700";
            if (hasIngredient) {
              color = hasIngredient && typeof hasIngredient === 'object' && hasIngredient.isVisible ? "text-green-500" : "text-yellow-500";
            }
            return (
                <li key={crypto.randomUUID()} className={color}>
                  {value} - {drink.ingredients[key.replace("strIngredient", "strMeasure")]}
                </li>
            );
          }
          return null;
        })}
      </ul>
        </div>
    </motion.li>
  );
};

export default Drink;
