import React from "react";

function AdminUpdateInput({
  name,
  children,
  value,
  onChangeHandler,
  style,
  type,
}) {
  return (
    <div className={`${style ? style : "sm:col-span-3"}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {children}
      </label>
      <input
        onChange={(ev) => onChangeHandler(ev.target.value)}
        type={type ? type : "text"}
        name={name}
        id={name}
        value={value}
        className="mt-2 block px-[5px] w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-gray-100 sm:text-sm sm:leading-6"
      />
    </div>
  );
}

export default AdminUpdateInput;
