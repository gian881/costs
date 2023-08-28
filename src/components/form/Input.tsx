import { ChangeEvent } from "react";
interface InputProps {
  type: string;
  text: string;
  name: string;
  placeholder: string;
  value?: string;
  handleOnChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  currency?: boolean;
}

export function Input({
  type,
  text,
  name,
  placeholder,
  value,
  handleOnChange,
  currency,
}: InputProps) {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="mb-2 font-bold">
        {text}
      </label>
      {currency ? (
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={handleOnChange}
          value={value}
          step="0.01"
          min="0"
          className="p-3 rounded-md placeholder:text-gray-500"
        />
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={handleOnChange}
          value={value}
          className="p-3 rounded-md placeholder:text-gray-500"
        />
      )}
    </div>
  );
}
