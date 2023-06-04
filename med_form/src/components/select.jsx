import React from "react";

export function Select(child) {
  return (
    <select {...child.register} {...child.rest}>
      <option selected disabled>
        {""}
      </option>
      {child.options.map((value) => (
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </select>
  );
}
