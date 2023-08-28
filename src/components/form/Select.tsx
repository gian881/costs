import { ChangeEvent } from "react";
import { Category } from "../../types";

interface SelectProps {
  text: string;
  name: string;
  options: Category[];
  value?: number;
  handleOnChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export function Select({
  text,
  name,
  options,
  handleOnChange,
  value,
}: SelectProps) {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="mb-2 font-bold">
        {text}
      </label>
      {value ? (
        <select
          name={name}
          id={name}
          value={value}
          onChange={handleOnChange}
          className="p-3 rounded-md placeholder:text-gray-500"
        >
          {options.map((opcao) => (
            <option value={opcao.id} key={opcao.id}>
              {opcao.name}
            </option>
          ))}
        </select>
      ) : (
        <select
          name={name}
          id={name}
          defaultValue={0}
          onChange={handleOnChange}
          className="p-3 rounded-md placeholder:text-gray-500"
        >
          <option value={0} hidden disabled>
            Select one option
          </option>

          {options.map((opcao) => (
            <option value={opcao.id} key={opcao.id}>
              {opcao.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
