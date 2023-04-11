import ListItem from "./ListItem";

const IngredientsList = ({
  ingredients,
  setIngredients,
}: {
  ingredients: Ingredient[];
  setIngredients: Function;
}) => {
  const toggleIngredientVisibility = (id: string) => {
    const foundIndexKey = ingredients.findIndex(
      (ingredient) => ingredient.id === id
    );

    const updatedIngredients = ingredients.map((ingredient, index) => {
      if (index === foundIndexKey) {
        return {
          name: ingredient.name,
          id: ingredient.id,
          isVisible: !ingredient.isVisible,
        };
      }

      return ingredient;
    });

    setIngredients(updatedIngredients);
  };

  const ListItems = ingredients.map((ingredient, index) => {
    return (
      <ListItem
        key={`${ingredient.name}.${index}`}
        ingredient={ingredient}
        toggleIngredientVisibility={toggleIngredientVisibility}
      />
    );
  });

  return <ul className="flex h-fit w-full flex-col gap-6">{ListItems}</ul>;
};

export default IngredientsList;
