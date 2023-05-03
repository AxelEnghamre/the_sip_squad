import { motion } from "framer-motion";
import { find, map } from "lodash";

function isIngredient(obj: any): obj is Ingredient {
  return obj && typeof obj === "object" && "isVisible" in obj;
}

const Drink = ({
  drink,
  ingredients,
}: {
  drink: any;
  ingredients: Ingredient[];
}) => {
  return (
    <motion.li
      className="z-10 m-4 flex w-full max-w-4xl flex-row flex-wrap items-center gap-6 rounded-xl bg-zinc-100 p-4 shadow-lg md:w-10/12 md:flex-row"
      key={crypto.randomUUID()}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
        cursor: "pointer",
      }}
      whileTap={{
        scale: 0.9,
        transition: { duration: 0.2 },
        cursor: "pointer",
      }}
      whileFocus={{ scale: 1.1, transition: { duration: 0.2 }, cursor: "grab" }}
      initial={{ opacity: 1 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <img
        src={drink.strDrinkThumb}
        alt={drink.strDrink}
        className="h-full w-full rounded-xl object-cover object-center shadow-lg md:w-72"
        draggable="false"
      />
      <div className="flex flex-col gap-2">
        <h3 className="w-60 text-3xl font-medium text-zinc-950">
          {drink.strDrink}
        </h3>

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
              if (hasIngredient && isIngredient(hasIngredient)) {
                color = hasIngredient.isVisible
                  ? "text-green-500"
                  : "text-yellow-500";
              }
              return (
                <li key={crypto.randomUUID()} className={color}>
                  {value} -{" "}
                  {
                    drink.ingredients[
                      key.replace("strIngredient", "strMeasure")
                    ]
                  }
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
