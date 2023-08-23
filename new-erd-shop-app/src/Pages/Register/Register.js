import style from "./Register.module.css";
import { getCountries, getCities } from "../../API/Api";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [country, setCountry] = useState(0);
  const [city, setCity] = useState(0);
  const [zipCode, setZipCode] = useState(0);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [role, setRole] = useState("");
  const params = useParams();

  //Managing data fetchign for country and city selection
  useEffect(() => {
    const fetchData = async () => {
      //Country Fetching
      const countryData = await getCountries();
      const fetchedCountries = countryData.Result;
      setCountries(fetchedCountries);
      //City Fetching
      const cityData = await getCities();
      const fetchedCities = cityData.Result;
      setCities(fetchedCities);
      setFilteredCities(fetchedCities);
    };
    fetchData();
  }, []);

  //This function deals with the role handling (so whether you're registering as a user or a storekeeper)
  useEffect(() => {
    if (params.role === "user" || params.role === "storekeeper") {
      setRole(params.role);
    } else {
      throw Error(
        "The role you're trying to register as is not provided by ERD-Shop, please check again for any mistakes made."
      );
    }
  }, [params]);

  //This changes the value of the country variable whilst also filtering out the cities based on country
  const changeCountry = (e) => {
    setCountry(e.target.value);
    const filteredCities = cities.filter(
      (city) => city.Country_Id == e.target.value
    );
    setFilteredCities(filteredCities);
    setCity(0);
  };

  function handleRegistration(e) {
    e.preventDefault();
    const user = JSON.stringify({
      First_Name: firstName,
      Last_Name: lastName,
      BirthDate: birthDate,
      City_Id: city,
      Zip_Code: zipCode,
      Address: address,
      Email: email,
      Password: password,
    });

    fetch(`https://localhost:5000/api/Authentication/Register?role=${role}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        First_Name: firstName,
        Last_Name: lastName,
        BirthDate: birthDate,
        City_Id: city,
        Zip_Code: zipCode,
        Address: address,
        Email: email,
        Password: password,
      }),
    }).then((res) => res.json());
    window.location.href = "/";
  }

  return (
    <div className={style.registerDiv}>
      <div className={style.contentDiv}>
        <h1>REGISTER</h1>
        <form
          className={style.registerForm}
          method="POST"
          onSubmit={(e) => handleRegistration(e)}
        >
          <input
            className={style.nameInput}
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className={style.nameInput}
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <br />
          <input
            className={style.birthdateInput}
            type="date"
            onChange={(e) => setBirthDate(new Date(e.target.value))}
          />
          <br />
          <select
            value={country}
            onChange={(e) => changeCountry(e)}
            className={style.locationInput}
          >
            <option value={0} disabled>
              Country
            </option>
            {countries.map((country) => (
              <option value={country.Country_Id} key={country.Country_Id}>
                {country.Country_Name}
              </option>
            ))}
          </select>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={style.locationInput}
          >
            <option value={0} disabled>
              City
            </option>
            {filteredCities.map((city) => (
              <option value={city.City_Id} key={city.City_Id}>
                {city.City_Name}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Zip Code"
            onChange={(e) => setZipCode(e.target.value)}
            className={style.locationInput}
          />
          <br />
          <input
            type="text"
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
            className={style.addressInput}
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className={style.emailInput}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className={style.passwordInput}
          />
          <br />
          <button className={style.submitButton} type="submit">
            Register
          </button>
        </form>
        <div className={style.storekeeperDiv}>
          <p>
            Want to register as a {role === "user" ? "storekeeper" : "user"}?
          </p>
          <NavLink
            to={
              role === "user" ? "../register/storekeeper" : "../register/user"
            }
          >
            Click here to apply
          </NavLink>
        </div>
      </div>
    </div>
  );
}
