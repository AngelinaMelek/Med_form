import React, { useState, useEffect } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
// import DateChanger from "./components/dateChange.jsx";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const [cities, setCities] = useState([]);
  const [specialities, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [doctorsF, setDoctorsF] = useState([]);
  const [specF, setSpecF] = useState([]);
  const [cityF, setCityF] = useState([]);

  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  // const [specialy, setSpecialty] = useState("");
  // const [doctor, setDoctor] = useState("");

  const fetchCitiesData = () => {
    fetch("https://run.mocky.io/v3/9fcb58ca-d3dd-424b-873b-dd3c76f000f4")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCities(data);
      });
    fetch("https://run.mocky.io/v3/e8897b19-46a0-4124-8454-0938225ee9ca")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSpecialties(data);
      });
    fetch("https://run.mocky.io/v3/3d1c993c-cd8e-44c3-b1cb-585222859c21")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDoctors(data);
      });
  };

  useEffect(() => {
    fetchCitiesData();
  }, []);

  const handleCityChange = (selected) => {
    let selectedCityName = selected.target.value;
    let selectedCity = cities.find((e) => e.name === selectedCityName);
    let filteredDocs = [];

    setCity(selectedCity);

    if (gender !== "") {
      filteredDocs = genderFilter(gender).filter(
        (doctor) => doctor.cityId === selectedCity.id
      );
    } else {
      filteredDocs = [...doctors].filter(
        (doctor) => doctor.cityId === selectedCity.id
      );
    }

    setDoctorsF(filteredDocs);
    specFilter(filteredDocs);
  };

  function genderFilter(gender) {
    let specFilteredIndex = [];
    let specFiltered = [...specialities];

    specFilteredIndex = specFiltered.filter(
      (spec) =>
        "params" in spec === true &&
        "gender" in spec.params === true &&
        spec.params.gender === gender
    );

    for (let j = 0; j < specFilteredIndex.length; j++) {
      for (let i = 0; i < specialities.length; i++) {
        if (specialities[i] === specFilteredIndex[j]) {
          delete specFiltered[i];
        }
      }
    }

    setSpecF(specFiltered.filter(Boolean));

    docFilter(specFiltered.filter(Boolean));
    cityFilter(docFilter(specFiltered.filter(Boolean)));
    return docFilter(specFiltered.filter(Boolean));
  }

  const handleGenderChange = (selected) => {
    if (selected.target.value === "Male") {
      setGender("Female");
      genderFilter("Female");
    }
    if (selected.target.value === "Female") {
      setGender("Male");
      genderFilter("Male");
    }
  };

  function cityFilter(selectedDocs) {
    let filteredCity = [];

    for (let i = 0; i < selectedDocs.length; i++) {
      for (let j = 0; j < cities.length; j++) {
        if (cities[j].id === selectedDocs[i].cityId) {
          filteredCity.push(cities[j]);
        }
      }
    }

    let uniqueFilteredCity = [...new Set(filteredCity)];

    setCityF(uniqueFilteredCity);
    return uniqueFilteredCity;
  }

  function specFilter(selectedDocs) {
    let specFiltered = [];
    for (let i = 0; i < selectedDocs.length; i++) {
      for (let j = 0; j < specialities.length; j++) {
        if (specialities[j].id === selectedDocs[i].specialityId) {
          specFiltered.push(specialities[j]);
        }
      }
    }

    let uniqueSpec = [...new Set(specFiltered)];
    setSpecF(uniqueSpec);
    return uniqueSpec;
  }

  function docFilter(selectedSpec) {
    let docFiltered = [];
    for (let i = 0; i < doctors.length; i++) {
      for (let j = 0; j < selectedSpec.length; j++) {
        if (selectedSpec[j].id === doctors[i].specialityId) {
          docFiltered.push(doctors[i]);
        }
      }
    }

    setDoctorsF(docFiltered);
    return docFiltered;
  }

  const handleDoctorChange = (selected) => {
    let selectedDocName = selected.target.value;
    let selectedDoc = doctors.find((e) => e.name === selectedDocName);
    let selectedDocs = [];

    selectedDocs.push(selectedDoc);

    cityFilter(selectedDocs);
    specFilter(selectedDocs);
  };

  const handleSpecChange = (selected) => {
    let selectedSpecName = selected.target.value;
    let selectedSpec = specialities.find((e) => e.name === selectedSpecName);
    let filteredDocs = [];

    if (city !== "") {
      filteredDocs = [...doctors].filter(
        (doctor) =>
          doctor.specialityId === selectedSpec.id && city.id === doctor.cityId
      );
    } else {
      filteredDocs = [...doctors].filter(
        (doctor) => doctor.specialityId === selectedSpec.id
      );
    }
    setDoctorsF(filteredDocs);

    cityFilter(filteredDocs);
  };

  const handleDateChange = (selected) => {
    const current = new Date();
    const chosenDate = new Date(selected.target.value);
    const eighteenYearsAgo = new Date(
      current.setFullYear(current.getFullYear() - 18)
    );

    setDate(selected.target.value);

    let filteredDocs = [];
    if (chosenDate > eighteenYearsAgo) {
      filteredDocs = doctors.filter((doctor) => doctor.isPediatrician === true);
    } else if (chosenDate < eighteenYearsAgo) {
      filteredDocs = doctors.filter(
        (doctor) => doctor.isPediatrician === false
      );
    }

    console.log(filteredDocs);

    setDoctorsF(filteredDocs);
    cityFilter(filteredDocs);
    specFilter(filteredDocs);
  };

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
      {/* <DateChanger register={register("date")} /> */}
      <input
        register={register("date")}
        onChange={handleDateChange}
        type="date"
        name="date"
        required
        placeholder="dd-mm-yyyy"
        value={date}
        min="1900-01-01"
        max="2030-12-31"
      />
      <label>Sex</label>
      <select
        name="sex"
        register={register("sex")}
        onChange={handleGenderChange}
      >
        <option key={"0"} value={"default"}></option>
        <option key={"Female"} value={"Female"}>
          Female
        </option>
        <option key={"Male"} value={"Male"}>
          Male
        </option>
      </select>

      <label>City</label>
      <select
        name="city"
        required
        {...register("city")}
        onChange={handleCityChange}
      >
        {cityF.length === 0 ? (
          <>
            <option key={"0"} value={"default"}></option>
            {cities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </>
        ) : (
          cityF.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))
        )}
      </select>

      <label>Doctor Specialty</label>
      <select
        name="doctor_specialty"
        register={register("doctor_specialty")}
        onChange={handleSpecChange}
      >
        {specF.length === 0 ? (
          <>
            <option key={"0"} value={"default"}></option>
            {specialities.map((specialty) => (
              <option key={specialty.id} value={specialty.name}>
                {specialty.name}
              </option>
            ))}
          </>
        ) : (
          specF.map((specialty) => (
            <option key={specialty.id} value={specialty.name}>
              {specialty.name}
            </option>
          ))
        )}
      </select>
      <label>Doctor</label>

      <select
        name="doctor"
        required
        {...register("doctor")}
        onChange={handleDoctorChange}
      >
        {doctorsF.length === 0 ? (
          <>
            <option key={"0"} value={"default"}></option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.name}>
                {`${doctor.name} ${doctor.surname}`}
              </option>
            ))}
          </>
        ) : (
          doctorsF.map((doctor) => (
            <option key={doctor.id} value={doctor.name}>
              {`${doctor.name} ${doctor.surname}`}
            </option>
          ))
        )}
      </select>

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
