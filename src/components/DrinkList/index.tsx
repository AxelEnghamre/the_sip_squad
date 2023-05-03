import { AnimatePresence, motion } from "framer-motion";
import Drink from "./Drink";

const DrinkList = ({
  drinkList,
  ingredients,
}: {
  drinkList: any[];
  ingredients: Ingredient[];
}) => {
  return (
    <motion.ul className="flex h-screen w-full flex-row flex-wrap items-center justify-center gap-6 overflow-x-visible overflow-y-scroll p-4 pt-20">
      <AnimatePresence>
        {drinkList.map((drink) => {
          return (
            <Drink
              drink={drink}
              ingredients={ingredients}
              key={crypto.randomUUID()}
            />
          );
        })}
      </AnimatePresence>
    </motion.ul>
  );
};

export default DrinkList;
