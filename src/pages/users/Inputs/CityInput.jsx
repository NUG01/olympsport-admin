import { useState, useEffect } from "react";
import BasicAxios from "../../../helpers/axios/BasicAxios";

function CityInput(props) {
  const [showCities, setShowCities] = useState(false);
  const [location, setLocation] = useState([]);
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState("");
  const [dataIsFetched, setDataIsFetched] = useState(false);

  useEffect(() => {
    BasicAxios.get("admin/users/city/" + props.city).then((res) => {
      setLocation(res.data);
      setDataIsFetched(true);
    });
  }, []);

  function citiesHandler() {
    BasicAxios.post("admin/users/cities", {
      city_name: location.city_name,
    })
      .then((res) => {
        setCities(res.data);
        setShowCities(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function chooseCity(ev) {
    setLocation({ ...location, city_name: ev.target.getAttribute("value") });
    setShowCities(false);
    props.cityValue(ev.target.getAttribute("id"));
  }

  const citiesMapper = () => (
    <div className="absolute w-[100%] max-h-[15rem] bg-gray-100 top-[3rem] left-0 rounded-[6px] overflow-x-hidden overflow-y-scroll">
      {cities.map((result) => {
        return (
          <div
            id={result.id}
            key={result}
            value={result.city_name}
            onClick={chooseCity}
            className="w-[100%] p-[3px] pl-[7px] text-[#000] bg-gray-100 border-b-[1.5px] border-b-[dark-gray] text-[13px] cursor-pointer hover:bg-gray-200"
          >
            {result.city_name}
          </div>
        );
      })}
    </div>
  );

  if (!dataIsFetched) return;

  return (
    <div className="sm:col-span-3">
      <label
        htmlFor="city"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        City Name
      </label>
      <div className="mt-2 relative w-full flex items-center relative">
        {cities != [] && cities.length > 0 && showCities && citiesMapper()}
        <input
          onChange={(ev) =>
            setLocation({ ...location, city_name: ev.target.value })
          }
          type="text"
          name="city"
          id="city"
          value={location.city_name}
          className="block px-[5px] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />

        <div className="text-[14px] text-[#000] h-full flex items-center jutify-center">
          <span
            onClick={citiesHandler}
            className="cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-[5px] px-[6px] py-[4px] ml-[7px]"
          >
            Search
          </span>
        </div>
      </div>
    </div>
  );
}

export default CityInput;
