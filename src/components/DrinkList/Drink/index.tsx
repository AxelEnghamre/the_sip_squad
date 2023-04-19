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
      className=" h-fit w-fit rounded-xl bg-celestial-blue p-4"
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
      <h3 className="text-xl text-bright-pink">{drink.strDrink}</h3>
        <img
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
            className="w-32 h-32 rounded-xl"
            draggable="false"
        />
      <ul className="flex flex-col gap-2">
        {map(drink.ingredients, (value, key) => {
          if (key.startsWith("strIngredient") && value) {
            const hasIngredient = find(ingredients, (ingredient) => {
              return (
                  ingredient.name.toLowerCase() === value.toLowerCase() &&
                  (ingredient.isVisible ? 1 : 2)
              );
            });
            let color = "text-black";
            if (hasIngredient) {
              color = hasIngredient.isVisible ? "text-green-500" : "text-yellow-500";
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
    </motion.li>
  );
};

export default Drink;
