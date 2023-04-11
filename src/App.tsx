import InputIngredient from "./components/InputIngredient";
import IngredientsList from "./components/IngredientsList";
import { useEffect, useState, } from "react";
import Result from "./hooks/useResultOfIngredient";



const App = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(()=>{
    console.log(ingredients);
  },[ingredients]);


  const addIngredient = (ingredient: string) => {
    setIngredients([...ingredients,{name: ingredient,isVisible: true,id:crypto.randomUUID()}]);
  }


  return (
    <>
      <IngredientsList ingredients={ingredients} setIngredients={setIngredients} />
      <InputIngredient onSubmit={addIngredient} />
    </>
  );
};

export default App;
