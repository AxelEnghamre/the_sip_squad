const Result = () => {
    const ingredients = "lime";
    const POST_API = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredients;
    const fetchAPI = async () => {
        const response = await fetch(POST_API);
        const data = await response.json();
        console.log(data);
    }
    return (
        <div>
            <h1>Result</h1>
            <button onClick={fetchAPI}>Fetch API</button>

        </div>
    )
}

export default Result