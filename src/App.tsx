import InputIngredient from "./components/InputIngredient";
import Result from "./hooks/useResultOfIngredient";

const App = () => {
  return (
    <>
      <InputIngredient onSubmit={(ingredient: string)=>{console.log(`submit ${ingredient}`)}} />
    </>
  );
};

export default App;
