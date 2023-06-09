import { AnimatePresence, motion } from "framer-motion";
import { find, map } from "lodash";
import { useState } from "react";

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
  const [flip, setFlip] = useState(false);

  return (
    <AnimatePresence>
      <motion.li
        onClick={() => {
          setFlip(!flip);
        }}
        className=" z-10 m-4 flex w-full max-w-4xl flex-row flex-wrap items-center gap-6 overflow-hidden rounded-xl bg-zinc-100 p-4 shadow-lg transition-all duration-500 ease-in-out hover:shadow-2xl md:w-10/12 md:flex-row"
        key={drink.strDrink}
        whileHover={{
          scale: 1,
          transition: { duration: 0.5, type: "spring" },
          cursor: "pointer",
        }}
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
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: flip ? 1 : 0, height: flip ? "auto" : 0 }}
          exit={{ opacity: !flip ? 0 : 1, height: !flip ? 0 : 1 }}
          transition={{ type: "spring", duration: 1 }}
        >
          <h3 className="mb-4 w-60 text-3xl font-medium text-zinc-950">
            Instructions
          </h3>
          {map(drink.ingredients, (value, key) => {
            if (key === "strInstructions" && value) {
              return <p key={value}>{value}</p>;
            }
            return null;
          })}
        </motion.div>
      </motion.li>
    </AnimatePresence>
  );
};

export default Drink;
