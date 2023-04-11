import ListItem from "./ListItem";

const IngredientsList = ({
  ingredients,
  toggleIngredientVisibility,
}: {
  ingredients: Ingredient[];
  toggleIngredientVisibility: Function;
}) => {
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
