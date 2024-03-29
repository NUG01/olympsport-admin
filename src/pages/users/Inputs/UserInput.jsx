import { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";

function UserInput(props) {
  function valueHandler(value) {
    props.updateValue(value);
  }
  return (
    <div className="sm:col-span-3">
      <label
        htmlFor={props.name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {props.label}
      </label>
      <div className="mt-2">
        <input
          onChange={(ev) => valueHandler(ev.target.value)}
          type={props.type}
          name={props.name}
          id={props.name}
          value={props.value}
          className="block px-[5px] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}

export default UserInput;
