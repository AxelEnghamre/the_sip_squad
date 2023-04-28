import { useState } from "react";

const InputIngredient = ({
  onSubmit,
  minimumLength = 2,
  maximumLength = 20,
}: {
  onSubmit: Function;
  minimumLength?: number;
  maximumLength?: number;
}) => {
  const [value, setValue] = useState("");

  // Handle the input change value from the input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    // If the key is enter submit
    if (event.key === "Enter") {
      handleSubmit();
    }
    // If the key is esc reset the value
    if (event.key === "Escape") {
      setValue("");
    }
  };

  // Validate the value before submit
  const handleSubmit = () => {
    if (value.length < minimumLength) {
      alert(`The ingredient must contain at least ${minimumLength} characters`);
      return;
    }
    if (value.length > maximumLength) {
      alert(
        `The ingredient can't contain more than ${maximumLength} characters`
      );
      return;
    }
    // submit and reset the value
    onSubmit(value);
    setValue("");
  };

  return (
    <div className="flex h-14 flex-row justify-between gap-2 rounded-xl bg-zinc-100 p-2 shadow-md">
      <input
        className="w-9/12 rounded-xl bg-zinc-100 p-2 text-charcoal transition duration-200 placeholder:text-zinc-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-opacity-50"
        type="text"
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        value={value}
        placeholder="Enter Ingredient"
      />
      <button
        className="hover:text-bold ml-2 h-full w-16 rounded-lg bg-zinc-800 text-slate-200 transition-colors duration-200 hover:bg-zinc-700 hover:text-teal-300"
        title={
          value.length + 1 > minimumLength && value.length - 1 < maximumLength
            ? `add ${value}`
            : "Can't add ingredient"
        }
        onClick={handleSubmit}
      >
        +
      </button>
    </div>
  );
};

export default InputIngredient;
