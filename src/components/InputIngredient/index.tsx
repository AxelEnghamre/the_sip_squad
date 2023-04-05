import { useState } from "react";

const InputIngredient = () => {
    const [value,setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);    
    };

    return (
        <div>
            <input type="text" onChange={handleChange} value={value} />
            <button>+</button>
        </div>
    );
};

export default InputIngredient;