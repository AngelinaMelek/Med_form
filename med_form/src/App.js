import React, { useState, useEffect } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import DateChanger from "./components/dateChange.jsx";
import { Select } from "./components/select";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const [cities, setCities] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const fetchCitiesData = () => {
    fetch("https://run.mocky.io/v3/9fcb58ca-d3dd-424b-873b-dd3c76f000f4")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCities(data);
        console.log(data);
      });
    fetch("https://run.mocky.io/v3/e8897b19-46a0-4124-8454-0938225ee9ca")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSpecialties(data);
        console.log(data);
      });
    fetch("https://run.mocky.io/v3/3d1c993c-cd8e-44c3-b1cb-585222859c21")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDoctors(data);
        console.log(data);
      });
  };

  useEffect(() => {
    fetchCitiesData();
  }, []);

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
      <DateChanger register={register("date")} />
      <label>Sex</label>
      <Select
        name="sex"
        options={["Female", "Male"]}
        register={register("sex")}
      />
      <label>City</label>
      <Select
        name="city"
        required
        options={cities.map((city) => city.name)}
        register={register("city")}
      />
      <label>Doctor Specialty</label>
      <Select
        name="doctor_specialty"
        options={specialties.map((specialty) => specialty.name)}
        register={register("doctor_specialty")}
      />
      <label>Doctor</label>
      <Select
        name="doctor"
        required
        options={doctors.map((doctor) => `${doctor.name} ${doctor.surname}`)}
        register={register("doctor")}
      />
      <label>Email</label>
      <input
        {...register("email", {
          required: true,
          pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        })}
      />

      {errors.email && (
        <p className="form__error">Please enter a valid email</p>
      )}
      <label>Mobile number </label>
      <input
        {...register("phone", {
          required: false,
          pattern: /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{2})?[- ]?(\d{2})$/,
        })}
      />
      {errors.phone && (
        <p className="form__error">Phone format: 000-000-00-00</p>
      )}
      <input type="submit" />
    </form>
  );
}

export default App;
