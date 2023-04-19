import {AnimatePresence, motion} from "framer-motion";

const Drink = ({
                   drink, ingredients
               }: {
    drink: any; ingredients: Ingredient[]
}) => {
    return (
        <li
            className=" h-fit w-fit rounded-xl bg-celestial-blue p-4"
            key={crypto.randomUUID()}
        >
            <h3 className="text-xl text-bright-pink">{drink.strDrink}</h3>
            <ul className="flex flex-col gap-2">
                {Object.keys(drink.ingredients).map((key) => {
                    if (
                        key.startsWith("strIngredient") &&
                        drink.ingredients[key]
                    ) {
                        return (
                            <li
                                key={crypto.randomUUID()}
                                className={
                                    ingredients.find((ingredient) => {
                                        if (
                                            ingredient.name.toLowerCase() ===
                                            drink.ingredients[key].toLowerCase()
                                        ) {
                                            if (ingredient.isVisible) {
                                                return 1;
                                            }
                                            return 2;
                                        }
                                    })
                                        ? "text-green-500"
                                        : "text-black"
                                }
                            >
                                {drink.ingredients[key]} -{" "}
                                {
                                    drink.ingredients[
                                        key.replace("strIngredient", "strMeasure")
                                        ]
                                }
                            </li>
                        );
                    }
                })}
            </ul>
        </li>
    );
};

export default Drink;
