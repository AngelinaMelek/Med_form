// import { useState, useEffect } from "react";

// export function Filters() {
//   const [cities, setCities] = useState([]);
//   const [specialties, setSpecialties] = useState([]);
//   const [doctors, setDoctors] = useState([]);

//   const fetchCitiesData = () => {
//     fetch("https://run.mocky.io/v3/9fcb58ca-d3dd-424b-873b-dd3c76f000f4")
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         setCities(data);
//         console.log(data);
//       });
//     fetch("https://run.mocky.io/v3/e8897b19-46a0-4124-8454-0938225ee9ca")
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         setSpecialties(data);
//         console.log(data);
//       });
//     fetch("https://run.mocky.io/v3/3d1c993c-cd8e-44c3-b1cb-585222859c21")
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         setDoctors(data);
//         console.log(data);
//       });
//   };

//   useEffect(() => {
//     fetchCitiesData();
//   }, []);
//   return console.log("a");
// }
