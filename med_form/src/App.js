import React from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import DateChanger from "./dateChange/dateChange";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <label>Name</label>
      <input
        {...register("name", {
          required: true,
          pattern: /^([a-zA-Z]+\s)*[a-zA-Z]+$/,
        })}
      />
      {errors.name && <p className="form__error">Please enter a valid name</p>}
      <label>Birthday Date</label>
      <DateChanger reg={register("date")} />
      <label>Sex</label>
      <select {...register("gender", { required: true })}>
        <option value="female">Female</option>
        <option value="male">Male</option>
      </select>
      <input type="submit" />
    </form>
  );
}

export default App;
