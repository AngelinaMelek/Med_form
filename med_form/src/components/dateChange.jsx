import React, { useState } from "react";

function DateChanger(props) {
  const [date, setDate] = useState("");
  const onDateChange = (e) => {
    console.log(e.target.value);
    setDate(e.target.value);
  };

  return (
    <input
      {...props.register}
      onChange={onDateChange}
      type="date"
      name="date"
      required
      placeholder="dd-mm-yyyy"
      value={date}
      min="1900-01-01"
      max="2030-12-31"
    />
  );
}

export default DateChanger;
