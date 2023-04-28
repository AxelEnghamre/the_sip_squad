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
    <div className="flex h-14 w-full flex-row justify-between gap-2 rounded-xl bg-zinc-200 p-1 shadow-sm">
      <input
        className="w-full rounded-l-lg bg-white p-2 text-charcoal transition-colors duration-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-bright-pink focus:ring-opacity-50"
        type="text"
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        value={value}
        placeholder="Enter Ingredient"
      />
      <button
        className="hover:text-bold h-full w-8 rounded-r-lg bg-slate-100 text-charcoal transition-colors duration-200 hover:bg-zinc-300 hover:text-bright-pink"
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
