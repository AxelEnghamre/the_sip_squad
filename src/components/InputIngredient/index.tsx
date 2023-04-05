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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleEnterKey = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

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
    onSubmit(value);
  };

  return (
    <div className="flex h-14 w-full flex-row justify-between gap-2 rounded-xl bg-bright-pink p-2">
      <input
        className="w-full rounded-l-lg bg-pale-dogwood p-2 text-charcoal placeholder:text-bright-pink"
        type="text"
        onChange={handleChange}
        onKeyUp={handleEnterKey}
        value={value}
        placeholder="Enter Ingredient"
      />
      <button
        className="h-full w-8 rounded-r-lg bg-pale-dogwood text-charcoal transition-colors duration-200 hover:text-bright-pink"
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
