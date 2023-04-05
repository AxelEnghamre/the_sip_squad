const Result = () => {
    const ingredients = "lime";
    const api = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredients;
    return (
        <div>
            <h1>Result</h1>
            <p>Ingredients: {ingredients}</p>
        </div>
    )
}

export default Result